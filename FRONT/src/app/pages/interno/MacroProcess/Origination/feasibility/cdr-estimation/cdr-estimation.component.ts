import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../../../../../domain/product';
import { ProductService } from '../../../../../../../service/productservice';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { forkJoin } from 'rxjs';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import * as XLSX from 'xlsx';
import { CDREstimation, Estimation } from '../../../../../../interfaces/origination/cdrEstimation/cdrEstimation.interface';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PermissionUser } from '../../../../../../../utils/permission-user.service';
const TEMPLATE_PLACEHOLDER_DATA: Estimation[] = [
  { year: 2015, annual_cdr: 111639 },
  { year: 2016, annual_cdr: 145509 },
  { year: 2017, annual_cdr: 148589 },
  { year: 2018, annual_cdr: 152048 },
];
@Component({
  selector: 'cdr-estimation',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY,],
  providers: [DatePipe, MessageService],
  templateUrl: './cdr-estimation.component.html',
})
export class CdrEstimationComponent {
  private _permissionUser     = inject(PermissionUser);

  token: any;
  idProject: number = 0;
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;
  permissions: Record<string, boolean> = {};
  data: CDREstimation | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;


  ersCalculators: any[] = [];
  estimateLeakeAge: any[] = [];

  dataImported: Estimation[] = [];

  form!: FormGroup;

  cdrEstimation!: CDREstimation;

  constructor(
    private fb: FormBuilder, 
    private _authGuardService: authGuardService,
    private _observableService: ObservableService,
    private _catalogsService: CatalogsService,
    private _datepipe: DatePipe,
    private _messageService: MessageService,
    private router: Router,
    private authService: authGuardService,
    private originationService: Origination
    
  ) {
    this.token = this._authGuardService.getToken();
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  ngOnInit() {
    this.loadPermissions();
    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });

    this.initForm();
    this.form.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  initForm(){
    this.form = this.fb.group({
      // estimation Result
      ErsCalculatorResult: [null, Validators.required],
      ProjectStartDate:[null, Validators.required],
    });
  }

    loadCatalogsAndData(){
      forkJoin({
        ersCalculators: this._catalogsService.getErsCalculatorVersion(this.token),
      }).subscribe({
        next: (res: any) => {
          this.ersCalculators  = res.ersCalculators.result;
          this.loadData();
        },
        error: (err) => console.error('Error cargando catálogos:', err)
      });
    }
  
/** Función para la importación de datos del excel de los CDR */
  onFileChange(event: { files: File[] }): void {
    const file = event.files[0]; // Limpiar datos anteriores al cargar un nuevo archivo 
    if (!file) return;

    const reader: FileReader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const binaryStr = e.target?.result as string;

      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
        range: 1, /** Aqui defino a partir de qué fila se inicia la relección de datos */
        defval: null
      });

      const newData: Estimation[] = rows.map((row: Record<string, unknown>) => ({
        year: Number(row['Year']) || 0,
        annual_cdr: Number(row['Annual CDRs']) || 0,
      }));

      if (this.areEstimationsEqual(newData, TEMPLATE_PLACEHOLDER_DATA)) {
        this._messageService.add({
          severity: 'warn',
          summary: 'Unmodified template',
          detail: 'The uploaded file is the sample template. Replace the data before importing.'
        });
        return;
      }

      if (this.areEstimationsEqual(newData, this.dataImported)) {
        this._messageService.add({
          severity: 'info',
          summary: 'No changes',
          detail: 'The file was not modified, the data is the same as the already loaded data.'
        });
        return;
      }

      this.dataImported = newData;
      this._messageService.add({
        severity: 'success',
        summary: 'Imported',
        detail: 'File imported successfully.'
      });
    };

    reader.readAsBinaryString(file);
  }

  getTotalCDRImported(): number {
    return this.dataImported.reduce((total, item) => total + (item.annual_cdr || 0), 0);
  }

  loadData(){
    this.originationService.getCDREstimation(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if(res.valido && res.result.length > 0){
          this.cdrEstimation = res.result[0] as CDREstimation;
          this.data = this.cdrEstimation;
          this.hasData = true;
          this.formChanged = false;
          this.isInsert = false;
          this.onEstimationSelected();
        } else {
          this.isInsert = true;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error cargando data:', err)
    });
  }

  onEstimationSelected(){
    this.form.patchValue({
      ErsCalculatorResult: this.cdrEstimation.ers_calculator_version_id,
      ProjectStartDate: this._datepipe.transform(this.cdrEstimation.project_start_date, 'yyyy-MM-dd'),
    }, { emitEvent: false });

    this.dataImported = this.cdrEstimation.estimations.map(est => ({
      year: est.year,
      annual_cdr: est.annual_cdr,
    }));
  }

  save(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      p_Id_cdr_estimation: this.cdrEstimation ? this.cdrEstimation.Id_cdr_estimation : 0,
      p_project_id: this.idProject,
      p_ers_calculator_version_id: this.form.value.ErsCalculatorResult,
      p_project_start_date: this._datepipe.transform(this.form.value.ProjectStartDate, 'yyyy-MM-dd'),
      p_estimations: JSON.stringify(this.dataImported)
    }

    this.originationService.setCDREstimation(data, this.token).subscribe({
      next: (res: Respuesta) => {
        if(res.valido === 1){
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadCatalogsAndData();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save CDR Estimation' });
        console.error('Error saving CDR Estimation:', err);
      }
    })
  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-MRV'] && !permisos['EDIT-MRV']) {
          this.form.disable();
        }
      }
    });
  }

  private areEstimationsEqual(a: Estimation[], b: Estimation[]): boolean {
    if (a.length !== b.length) return false;

    const sortedA = [...a].sort((x, y) => x.year - y.year);
    const sortedB = [...b].sort((x, y) => x.year - y.year);

    return sortedA.every((item: Estimation, index: number) => {
      const other = sortedB[index];
      return item.year === other.year && item.annual_cdr === other.annual_cdr;
    });
  }
  
}
