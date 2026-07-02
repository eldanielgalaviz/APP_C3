import { Component, OnInit, inject } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { Product } from '../../../../../../../domain/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionUser } from '../../../../../../../utils/permission-user.service';
import { forkJoin, Subscription } from 'rxjs';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { TechnicalDueDiligenceByProject } from '../../../../../../interfaces/origination/documentstdd/TechnicalDueDiligence.interface';
import { TechnicalDueDiligence } from '../../../../../../../service/Origination/origination-technical-due-diligence.service';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'tdd-document',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  standalone: true,
  providers: [DatePipe, MessageService],
  templateUrl: './tdd-document.component.html',
})
export class TddDocumentComponent implements OnInit {
  private _permissionUser     = inject(PermissionUser);
  permissions: Record<string, boolean> = {};
  form!: FormGroup;
  products!: Product[];
  // Document Upload
  Uploading: boolean = false;
  Uploaded: boolean = false;
  File: File | null = null;

  private fb                       = inject(FormBuilder);
  private _authGuardService        = inject(authGuardService);
  private _catalogsService         = inject(CatalogsService);
  private _originacionTDDService   = inject(TechnicalDueDiligence);
  private _originationService = inject(Origination);
  private datePipe = inject(DatePipe);
  private _messageService     = inject(MessageService);
  
  /** Lectura del proyecto en el que se encuentra posicionado el usuario */
  private _observableService = inject(ObservableService);
  private subscription?: Subscription;
  
  token: string = this._authGuardService.getToken() || '';
  idProject: number                    = 0;

  milestonesTDD:     any[] = [];
  statusTDD:         any[] = [];
  documents: TechnicalDueDiligenceByProject[] = [];
  documentSelected?: TechnicalDueDiligenceByProject;

  isSaving: boolean = false;

  loadCatalogsAndData(): void {
    forkJoin({
      StatusDocuments:     this._catalogsService.getStatusDocuments(this.token),
      MilestonesTDD:   this._catalogsService.getMilestonesTDD(this.token),
    }).subscribe({
      next: (res) => {
        this.milestonesTDD     = res.MilestonesTDD.result;
        this.statusTDD   = res.StatusDocuments.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(){
    this._originacionTDDService.getTechnicalDueDiligence(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if(res.valido == 1){
          this.documents = res.result;
        }
      },
      error: (err) => console.error('Error cargando data:', err)
    })
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }


  getSeverity(status: string) {
    switch (status) {
      case 'Pending': return 'warn';
      case 'Rejected': return 'danger';
      case 'Approved':  return 'success';
    }
    return undefined;
  }

  ngOnInit() {
    this.initFormulario();
    this.loadPermissions();
    /** obtenemos el id de proyecto */
    this.subscription = this._observableService.selectedProject$.subscribe(project => {
      if (project) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });
  }

  initFormulario(){
    this.form = this.fb.group({
      milestone:    [null, Validators.required],
      documentName: [null, Validators.required],
      generateDate: [null, Validators.required],
      status:       [null, Validators.required],
    });
  }

  onUpload(event: any): void {
    this.Uploading = true;
    this.Uploaded  = false;
    this.File = event.files[0];
    setTimeout(() => {
      this.Uploading = false;
      this.Uploaded  = true;
    }, 2000);
  }

  loadFileUrl(data: TechnicalDueDiligenceByProject): void {
    if (data.document_url) {
      this._originationService.getFileWithPath(data.document_url, this.token).subscribe((blob: Blob) => {
        const documentUrl = URL.createObjectURL(blob);
        window.open(documentUrl, '_blank');        
      });
    }
  }

  onRowSelected(document: TechnicalDueDiligenceByProject) {
    this.documentSelected = document;
    this.form.patchValue({
      milestone:    this.documentSelected.milestone_id,
      documentName: this.documentSelected.document_names,
      generateDate: this.datePipe.transform( this.documentSelected.generate_date, 'yyyy-MM-dd'),
      status:       this.documentSelected.status_id,
    });
  }
  
  saveDocument() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isSaving) return;
    this.isSaving = true;

    if(!this.File && !this.documentSelected) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please upload a document' });
      this.isSaving = false;
      return;
    }

    const data = {
      p_id_tdd_documents : this.documentSelected ? this.documentSelected.id_tdd_documents : 0,
      p_projects_id: this.idProject,
      p_milestone_id: this.form.value.milestone,
      p_document_names: this.form.value.documentName,
      p_document_url: this.documentSelected?.document_url || '',
      p_generate_date: this.datePipe.transform(this.form.value.generateDate, 'yyyy-MM-dd'),
      p_status_id: this.form.value.status,
    }

    const namedFiles: { key: string; file: File }[] = [];
    if (this.File) namedFiles.push({ key: 'docTddFile', file: this.File });

    this._originacionTDDService.setTechnicalDueDiligence(data, namedFiles, this.token).subscribe({
      next: (res: Respuesta) => {
        if(res.valido == 1){
          this.loadData();
          this.form.reset();
          this.File = null;
          this.documentSelected = undefined;
          this.isSaving = false; 
          this.Uploaded = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
        }
      },
      error: (err) =>{
         console.error('Error guardando data:', err)
         this.isSaving = false;
         this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save document' });
        }
    });

  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-ORIGINATION'] && !permisos['EDIT-ORIGINATION']) {
          this.form.disable();
        }
      }
    });
  }

}