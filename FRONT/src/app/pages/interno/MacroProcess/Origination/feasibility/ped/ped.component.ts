import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { Ped } from '../../../../../../interfaces/origination/ped/ped.interface';

@Component({
  selector: 'ped',
  imports: [SHARED_IMPORTS],
  templateUrl: './ped.component.html',
  providers: [MessageService]
})
export class PedComponent implements OnInit {

  token: any;
  idProject: number = 0;
  form!: FormGroup;
  state: any[] | undefined;

  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;
  // PED AA-Local 
  pedUploading: boolean = false;
  pedUploaded: boolean = false;
  pedFile: File | null = null;  
  pedPath: string = '';
  pedUrl: string = '';

  //catalogs
  resultPedAp: any [] = [];
  pedAaSection: any [] = [];
  populationAa: any [] = [];
  agriculturalActivity: any [] = [];
  survey: any [] = [];
  subsidies: any [] = [];
  aaSteep: any [] = [];
  coverageChange: any [] = [];
  resultPedAa: any [] = [];

  ped!: Ped;


  constructor(
    private fb: FormBuilder,
    private _catalogsService: CatalogsService,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
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

  ngOnInit() {
    this.token = this._authGuardService.getToken();
    this.initForm();
    this.applyPermissions();

    this.state = [
      { name: 'N/A', value: 2 },
      { name: 'Yes', value: 1 },
      { name: 'No', value: 0 },
    ];

    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });
  }

  initForm(){
    this.form = this.fb.group({
      // AP-Regional Result
      pedApRegionalResult:          [null, Validators.required],
      canIncludeAnpOrAdvc:          [null, Validators.required],
      canIncludePsa:                [null, Validators.required],
      requiresCommercialAgriculture:[null, Validators.required],
      requiresSubsidies:            [null, Validators.required],

      // Local PED on AA
      seccionPedAA:                 [null, Validators.required],
      poblacionAaConModelo:         [null, Validators.required],
      actividadAgropecuaria:        [null, Validators.required],
      encuestas:                    [null, Validators.required],
      subsidiosAa:                  [null, Validators.required],
      pendienteAa:                  [null, Validators.required],
      cambioCoberturaAa:            [null, Validators.required],

      // Local Feasibility on AA
      resultadoPedAaLocal:          [null, Validators.required],
      notesLocal:                   ['',   Validators.required],
    });
  }

  loadCatalogsAndData() {
    forkJoin({
      resultPedAp: this._catalogsService.getResultPedAp(this.token),
      pedAaSection: this._catalogsService.getPedaaSection(this.token),
      populationAa: this._catalogsService.getPopulationA(this.token),
      agriculturalActivity: this._catalogsService.getAgriculturalActivity(this.token),
      survey: this._catalogsService.getPedSurvey(this.token),
      subsidies: this._catalogsService.getSubsidiesA(this.token),
      aaSteep: this._catalogsService.getPedaaSteep(this.token),
      coverageChange: this._catalogsService.getCoverageChangeA(this.token),
      resultPedAa: this._catalogsService.getPedaaResult(this.token),
    }).subscribe({
      next: (res: any) => {
        this.resultPedAp = res.resultPedAp.result;
        this.pedAaSection = res.pedAaSection.result;
        this.populationAa = res.populationAa.result;
        this.agriculturalActivity = res.agriculturalActivity.result;
        this.survey = res.survey.result;
        this.subsidies = res.subsidies.result;
        this.aaSteep = res.aaSteep.result;
        this.coverageChange = res.coverageChange.result;
        this.resultPedAa = res.resultPedAa.result;
        // this.applyPermissions();
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(){
    this.originationService.getPed(this.idProject, this.token).subscribe({
        next: (res: Respuesta) => {
        if(res.valido && res.result.length > 0){
          this.ped = res.result[0] as Ped;
          this.isInsert = false;
          this.onPedSelected();
          this.loadFileUrls(this.ped);
        } else {
          this.isInsert = true;
        }
        },
        error: (err) => console.error('Error cargando data:', err)
    });
  }

  onPedSelected(){
    this.form.patchValue({
      pedApRegionalResult: this.ped.ped_ap_result_id,
      canIncludeAnpOrAdvc: this.ped.can_include_anp_or_advc,
      canIncludePsa: this.ped.can_include_psa,
      requiresCommercialAgriculture: this.ped.requires_commercial_agriculture,
      requiresSubsidies: this.ped.requires_subsidies,
      seccionPedAA: this.ped.pedaa_section_id,
      poblacionAaConModelo: this.ped.aa_population_id,
      actividadAgropecuaria: this.ped.agricultural_activity_id,
      encuestas: this.ped.survey_id,
      subsidiosAa: this.ped.aa_subsidy_id,
      pendienteAa: this.ped.aa_steep_id,
      cambioCoberturaAa: this.ped.aa_coverage_change_id,
      resultadoPedAaLocal: this.ped.pedaa_result_id,
      notesLocal: this.ped.pedaa_observations,
    });
  }

  loadFileUrls(data: Ped) {
    if (data.pedaa_link) {
      this.originationService.getFileWithPath(data.pedaa_link, this.token).subscribe((blob: Blob) => {
        this.pedUrl = URL.createObjectURL(blob);
      });
    }
  }

  onPedUpload(event: any): void {
    this.pedUploading = true;
    this.pedUploaded  = false;
    this.pedFile = event.files[0];
    setTimeout(() => {
      this.pedUploading = false;
      this.pedUploaded  = false;
      this.pedUrl  = URL.createObjectURL(this.pedFile!);
      this.pedPath = this.pedFile?.name || '';
    }, 500);
  }

  onPedDelete(): void {
    this.pedFile     = null;
    this.pedUploaded = false;
    this.pedUploading = false;
    this.pedPath     = '';
    this.pedUrl      = '';
  }



  savePed(){
    if (this.form.invalid){
      console.log(this.form.valid);
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      p_id_ped: this.ped ? this.ped.Id_ped : 0,
      p_projects_id: this.idProject,
      p_ped_ap_result_id: this.form.value.pedApRegionalResult,
      p_can_include_anp_or_advc: this.form.value.canIncludeAnpOrAdvc,
      p_can_include_psa: this.form.value.canIncludePsa,
      p_requires_commercial_agriculture: this.form.value.requiresCommercialAgriculture,
      p_requires_subsidies: this.form.value.requiresSubsidies,
      p_pedaa_section_id: this.form.value.seccionPedAA,
      p_aa_population_id: this.form.value.poblacionAaConModelo,
      p_agricultural_activity_id: this.form.value.actividadAgropecuaria,
      p_survey_id: this.form.value.encuestas,
      p_aa_subsidy_id: this.form.value.subsidiosAa,
      p_aa_steep_id: this.form.value.pendienteAa,
      p_aa_coverage_change_id: this.form.value.cambioCoberturaAa,
      p_pedaa_result_id: this.form.value.resultadoPedAaLocal,
      p_pedaa_link: this.ped.pedaa_link ? this.ped.pedaa_link : '', // aqui mando el link del archivo cargado
      p_pedaa_observations: this.form.value.notesLocal,
    }

    const namedFiles: { key: string, file: File }[] = [];
    if (this.pedFile) namedFiles.push({ key: 'docPedFile', file: this.pedFile });


    this.originationService.setPed(data, namedFiles,this.token).subscribe({
      next: (res: Respuesta) => {
        if(res.valido === 1){
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadCatalogsAndData();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Ped area' });
        console.error('Error saving Ped area:', err);
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