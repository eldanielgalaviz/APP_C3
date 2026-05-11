import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ProjectArea } from '../../../../../../interfaces/origination/project-area/project-area.interface';


@Component({
  selector: 'project-area',
  imports: [SHARED_IMPORTS],
  templateUrl: './project-area.component.html',
  providers: [MessageService]
})
export class ProjectAreaComponent implements OnInit {

  form!: FormGroup;
  idProject: number = 0;
  token: any;

  projectArea!: ProjectArea;
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

  certifications: any[] = [];
  ranApplications: any[] = [];
  apPorSigOptions: any[] = [];

  // PHINA
  phinaUploading = false;
  phinaUploaded  = false;
  phinaFile: File | null = null;
  phinaPath: string = '';

  // Internal Flat
  internalFlatUploading = false;
  internalFlatUploaded  = false;
  internalFlatFile: File | null = null;
  internalFlatPath: string = '';

  // AP
  apUploading = false;
  apUploaded  = false;
  apFile: File | null = null;
  apPath: string = '';
  phinaUrl: string = '';
  internalFlatUrl: string = '';
  apUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private _catalogsService: CatalogsService,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private router: Router,
    private authService: authGuardService,
    private originationService: Origination
  ) {}

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit() {
    this.token = this._authGuardService.getToken();

    this.form = this.fb.group({
      certification:         [null, Validators.required],
      totalAreaPhina:        ['',   Validators.required],
      achurado:              ['',   Validators.required],
      expropriatedArea:      ['',   Validators.required],
      totalPerimeterAreaRan: ['',   Validators.required],
      ranApplication:        [null, Validators.required],
      internalFlatSurface:   ['',   Validators.required],
      expropriatedAreas:     ['',   Validators.required],
      planYear:              [null, Validators.required],
      apPorSig:              [null, Validators.required],
      observations:          ['',   Validators.required],
    });

    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });
  }

  loadCatalogsAndData() {
    forkJoin({
      certifications: this._catalogsService.getCertificacion(this.token),
      ranApplications: this._catalogsService.getSolicitudalRan(this.token),
      apPorSig: this._catalogsService.getStatusvalidacionAp(this.token),
    }).subscribe({
      next: (res: any) => {
        this.certifications  = res.certifications.result;
        this.ranApplications = res.ranApplications.result;
        this.apPorSigOptions = res.apPorSig.result;
        this.applyPermissions();
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadFileUrls(data: ProjectArea): void {
    if (data.file_path_phina) {
      this.originationService.getFileWithPath(data.file_path_phina, this.token).subscribe((blob: Blob) => {
        this.phinaUrl = URL.createObjectURL(blob);
      });
    }
    if (data.file_path_internal_flat) {
      this.originationService.getFileWithPath(data.file_path_internal_flat, this.token).subscribe((blob: Blob) => {
        this.internalFlatUrl = URL.createObjectURL(blob);
      });
    }
    if (data.file_path_ap) {
      this.originationService.getFileWithPath(data.file_path_ap, this.token).subscribe((blob: Blob) => {
        this.apUrl = URL.createObjectURL(blob);
      });
    }
  }
  loadData() {
    this.originationService.getspProjectAreas(this.idProject, this.token).subscribe({
      next: (res: any) => {
        if (res.result && res.result.length > 0) {
          const data: ProjectArea = res.result[0];
          this.projectArea = data;
          this.isInsert = false;
          this.phinaPath       = data.file_path_phina || '';
          this.internalFlatPath = data.file_path_internal_flat || '';
          this.apPath          = data.file_path_ap || '';
          this.form.patchValue({
            certification:         this.certifications.find(x => x.Id_certificacion === data.id_certification),
            totalAreaPhina:        data.total_area,
            achurado:              data.achurado,
            expropriatedArea:      data.expropriated_area,
            totalPerimeterAreaRan: data.total_perimeter_area_ran,
            ranApplication:        this.ranApplications.find(x => x.Id_solicitud_ran === data.ran_application),
            internalFlatSurface:   data.internal_flat_surface,
            expropriatedAreas:     data.expropriated_areas,
            planYear:              data.plan_yaer,
            apPorSig:              this.apPorSigOptions.find(x => x.Id_statusvalidacionap === data.id_ap_por_sig),
            observations:          data.observations_ap,
          });
          this.loadFileUrls(data);
        } else {
          this.isInsert = true;
        }
      },
      error: () => {}
    });
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      p_Id_project:               this.idProject,
      p_id_certification:         this.form.value.certification?.Id_certificacion,
      p_total_area:               this.form.value.totalAreaPhina,
      p_achurado:                 this.form.value.achurado,
      p_expropriated_area:        this.form.value.expropriatedArea,
      p_file_path_phina:          this.phinaFile ? '' : this.phinaPath,
      p_total_perimeter_area_ran: this.form.value.totalPerimeterAreaRan,
      p_ran_application:          this.form.value.ranApplication?.Id_solicitud_ran,
      p_internal_flat_surface:    this.form.value.internalFlatSurface,
      p_expropriated_areas:       this.form.value.expropriatedAreas,
      p_plan_yaer:                Number(this.form.value.planYear),
      p_file_path_internal_flat:  this.internalFlatFile ? '' : this.internalFlatPath,
      p_id_ap_por_sig:            Number(this.form.value.apPorSig?.Id_statusvalidacionap),
      p_file_path_ap:             this.apFile ? '' : this.apPath,
      p_observations_ap:          this.form.value.observations,
    };

    const namedFiles: { key: string, file: File }[] = [];
    if (this.phinaFile)        namedFiles.push({ key: 'docPhina',     file: this.phinaFile });
    if (this.internalFlatFile) namedFiles.push({ key: 'docInterFlat', file: this.internalFlatFile });
    if (this.apFile)           namedFiles.push({ key: 'DocAP',        file: this.apFile });

    this.originationService.setProjectAreas(payload, namedFiles, this.token).subscribe({ 
      next: (res: any) => {
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
            this.phinaFile         = null;
            this.phinaUploaded     = false;
            this.phinaUploading    = false;
            this.internalFlatFile  = null;
            this.internalFlatUploaded  = false;
            this.internalFlatUploading = false;
            this.apFile        = null;
            this.apUploaded    = false;
            this.apUploading   = false;
            this.loadCatalogsAndData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save' });
        }
      },
      error: () => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  onPhinaUpload(event: any): void {
    this.phinaUploading = true;
    this.phinaUploaded  = false;
    this.phinaFile = event.files[0];
    setTimeout(() => {
      this.phinaUploading = false;
      this.phinaUploaded  = false;
      this.phinaUrl  = URL.createObjectURL(this.phinaFile!);
      this.phinaPath = this.phinaFile?.name || '';
    }, 500);
  }

  onInternalFlatUpload(event: any): void {
    this.internalFlatUploading = true;
    this.internalFlatUploaded  = false;
    this.internalFlatFile = event.files[0];
    setTimeout(() => {
      this.internalFlatUploading = false;
      this.internalFlatUploaded  = false;
      this.internalFlatUrl  = URL.createObjectURL(this.internalFlatFile!);
      this.internalFlatPath = this.internalFlatFile?.name || '';
    }, 500);
  }

  onApUpload(event: any): void {
    this.apUploading = true;
    this.apUploaded  = false;
    this.apFile = event.files[0];
    setTimeout(() => {
      this.apUploading = false;
      this.apUploaded  = false;
      this.apUrl = URL.createObjectURL(this.apFile!);
      this.apPath = this.apFile?.name || '';
    }, 500);
  }

  onApDelete(): void {
    this.apFile     = null;
    this.apUploaded = false;
    this.apUploading = false;
    this.apPath     = '';
    this.apUrl      = '';
  }

  onPhinaDelete(): void {
    this.phinaFile     = null;
    this.phinaUploaded = false;
    this.phinaUploading = false;
    this.phinaPath     = '';
    this.phinaUrl      = '';
  }

  onInternalFlatDelete(): void {
    this.internalFlatFile     = null;
    this.internalFlatUploaded = false;
    this.internalFlatUploading = false;
    this.internalFlatPath     = '';
    this.internalFlatUrl      = '';
  }

  applyPermissions(): void {
    this.canEdit   = this.authService.hasPermission(this.router.url, 'EDIT');
    this.canCreate = this.authService.hasPermission(this.router.url, 'CREATE');

    if (!this.canEdit && !this.canCreate) {
      this.form.disable();
    }
  }
}