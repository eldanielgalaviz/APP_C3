import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
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

@Component({
  selector: 'cdr-estimation',
  imports: [SHARED_IMPORTS,],
  providers: [DatePipe, MessageService],
  templateUrl: './cdr-estimation.component.html',
})
export class CdrEstimationComponent {

  token: any;
  idProject: number = 0;
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

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

    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });

    this.initForm();
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
          this.applyPermissions();
          this.loadData();
        },
        error: (err) => console.error('Error cargando catálogos:', err)
      });
    }
  
/** Función para la importación de datos del excel de los CDR */
  onFileChange(event: any) {
    this.dataImported = []; // Limpiar datos anteriores al cargar un nuevo archivo
    const file = event.files[0];

    if (!file) return;

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const binaryStr: string = e.target.result;

      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, {
        type: 'binary'
      });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const data = XLSX.utils.sheet_to_json(worksheet, {
        range: 1, /** Aqui defino a partir de qué fila se inicia la relección de datos */
        defval: null
      });

      data.forEach((row: any) => {
        this.dataImported.push({
          year: row['Year'] || null,
          annual_cdr: row['Annual CDRs'] || null,
        });
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
          this.isInsert = false;
          this.onEstimationSelected();
        } else {
          this.isInsert = true;
        }
       },
       error: (err) => console.error('Error cargando data:', err)
    });
  }

  onEstimationSelected(){
    this.form.patchValue({
      ErsCalculatorResult: this.cdrEstimation.ers_calculator_version_id,
      ProjectStartDate: this._datepipe.transform(this.cdrEstimation.project_start_date, 'yyyy-MM-dd'),
    });

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

  applyPermissions(): void {
    this.canEdit   = this.authService.hasPermission(this.router.url, 'EDIT');
    this.canCreate = this.authService.hasPermission(this.router.url, 'CREATE');

    if (!this.canEdit && !this.canCreate) {
      this.form.disable();
    }
  }
  
}
