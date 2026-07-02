import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { Ped, PedOriginationPayload, PedSigPayload } from '../../../../../../interfaces/origination/ped/ped.interface';
import {
  PedApResult, PedaaSection, AaPopulation, AgriculturalActivity,
  Survey, AaSubsidy, AaSteep, AaCoverageChange, PedaaResult
} from '../../../../../../interfaces/origination/ped/ped-catalogs.interface';
import { PermissionUser } from '../../../../../../../utils/permission-user.service';

@Component({
  selector: 'ped',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './ped.component.html',
  providers: [MessageService]
})
export class PedComponent implements OnInit, OnDestroy {

  private _fb                 = inject(FormBuilder);
  private _catalogsService    = inject(CatalogsService);
  private _observableService  = inject(ObservableService);
  private _authGuardService   = inject(authGuardService);
  private _messageService     = inject(MessageService);
  private _originationService = inject(Origination);
  private _permissionUser     = inject(PermissionUser);
  private formSubs: Subscription = new Subscription();

  token: string = this._authGuardService.getToken() || '';

  /** Estado */
  idProject:   number                    = 0;
  isInsert:    boolean                   = true;
  ped:         Ped | undefined;
  permissions: Record<string, boolean>   = {};
  isSaving:    boolean                   = false;

  hasDataOrigination: boolean = false;
  hasDataSig:         boolean = false;

  formChangedPedAp:          boolean = false;
  formChangedPedAa:          boolean = false;
  formChangedLocalFeasibility: boolean = false;

  /** Archivo PED */
  pedUploading: boolean = false;
  pedUploaded:  boolean = false;
  pedFile:      File | null = null;
  pedPath:      string = '';
  pedUrl:       string = '';

  /** Opciones estáticas */
  yesNoOptions = [
    { name: 'N/A', value: 2 },
    { name: 'Yes', value: 1 },
    { name: 'No',  value: 0 },
  ];

  /** Catálogos */
  resultPedAp:          PedApResult[]         = [];
  pedAaSection:         PedaaSection[]        = [];
  populationAa:         AaPopulation[]        = [];
  agriculturalActivity: AgriculturalActivity[] = [];
  survey:               Survey[]              = [];
  subsidies:            AaSubsidy[]           = [];
  aaSteep:              AaSteep[]             = [];
  coverageChange:       AaCoverageChange[]    = [];
  resultPedAa:          PedaaResult[]         = [];

  /** Formulario */
  form = this._fb.group({
    // ped origination
    pedApRegionalResult:           [null as number | null, Validators.required],
    canIncludeAnpOrAdvc:           [null as number | null, Validators.required],
    canIncludePsa:                 [null as number | null, Validators.required],
    requiresCommercialAgriculture: [null as number | null, Validators.required],
    requiresSubsidies:             [null as number | null, Validators.required],
    // ped sig
    seccionPedAA:                  [null as number | null, Validators.required],
    poblacionAaConModelo:          [null as number | null, Validators.required],
    actividadAgropecuaria:         [null as number | null, Validators.required],
    encuestas:                     [null as number | null, Validators.required],
    subsidiosAa:                   [null as number | null, Validators.required],
    pendienteAa:                   [null as number | null, Validators.required],
    cambioCoberturaAa:             [null as number | null, Validators.required],
    // local feasibility
    resultadoPedAaLocal:           [null as number | null, Validators.required],
    notesLocal:                    ['',                    Validators.required],
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit(): void {
    this.loadPermissions();
    this.subscribeFormChanges();
    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });
  }

  ngOnDestroy(): void {
    this.formSubs.unsubscribe();
  }

  private subscribeFormChanges(): void {
    const secSub = this.form.get('seccionPedAA')?.valueChanges.subscribe(() => {
      this.applyPedAaRules();
      this.formChangedPedAa = true;
    });
    if (secSub) this.formSubs.add(secSub);

    this.pedApFields.forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedPedAp = true;
      });
      if (sub) this.formSubs.add(sub);
    });

    this.pedAaFields.filter(f => f !== 'seccionPedAA').forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedPedAa = true;
      });
      if (sub) this.formSubs.add(sub);
    });

    this.localFeasibilityFields.forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedLocalFeasibility = true;
      });
      if (sub) this.formSubs.add(sub);
    });
  }

  loadCatalogsAndData(): void {
    forkJoin({
      resultPedAp:          this._catalogsService.getResultPedAp(this.token),
      pedAaSection:         this._catalogsService.getPedaaSection(this.token),
      populationAa:         this._catalogsService.getPopulationA(this.token),
      agriculturalActivity: this._catalogsService.getAgriculturalActivity(this.token),
      survey:               this._catalogsService.getPedSurvey(this.token),
      subsidies:            this._catalogsService.getSubsidiesA(this.token),
      aaSteep:              this._catalogsService.getPedaaSteep(this.token),
      coverageChange:       this._catalogsService.getCoverageChangeA(this.token),
      resultPedAa:          this._catalogsService.getPedaaResult(this.token),
    }).subscribe({
      next: (res) => {
        this.resultPedAp          = res.resultPedAp.result;
        this.pedAaSection         = res.pedAaSection.result;
        this.populationAa         = res.populationAa.result;
        this.agriculturalActivity = res.agriculturalActivity.result;
        this.survey               = res.survey.result;
        this.subsidies            = res.subsidies.result;
        this.aaSteep              = res.aaSteep.result;
        this.coverageChange       = res.coverageChange.result;
        this.resultPedAa          = res.resultPedAa.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(): void {
    this._originationService.getPed(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.ped      = res.result[0] as Ped;
          this.isInsert = false;

          this.hasDataOrigination = !!this.ped.Id_ped_origination;
          this.hasDataSig         = !!this.ped.Id_ped_sig;

          this.formChangedPedAp           = false;
          this.formChangedPedAa           = false;
          this.formChangedLocalFeasibility = false;

          this.form.patchValue({
            pedApRegionalResult:           this.ped.ped_ap_result_id,
            canIncludeAnpOrAdvc:           this.ped.can_include_anp_or_advc,
            canIncludePsa:                 this.ped.can_include_psa,
            requiresCommercialAgriculture: this.ped.requires_commercial_agriculture,
            requiresSubsidies:             this.ped.requires_subsidies,
            seccionPedAA:                  this.ped.pedaa_section_id,
            poblacionAaConModelo:          this.ped.aa_population_id,
            actividadAgropecuaria:         this.ped.agricultural_activity_id,
            encuestas:                     this.ped.survey_id,
            subsidiosAa:                   this.ped.aa_subsidy_id,
            pendienteAa:                   this.ped.aa_steep_id,
            cambioCoberturaAa:             this.ped.aa_coverage_change_id,
            resultadoPedAaLocal:           this.ped.pedaa_result_id,
            notesLocal:                    this.ped.pedaa_observations,
          }, { emitEvent: false });
          this.applyPedAaRules();

          this.loadFileUrls(this.ped);
        } else {
          this.isInsert = true;
        }
      },
      error: (err) => console.error('Error cargando PED:', err)
    });
  }

  loadFileUrls(data: Ped): void {
    if (data.pedaa_link?.startsWith('proyectos')) {
      this._originationService.getFileWithPath(data.pedaa_link, this.token).subscribe((blob: Blob) => {
        this.pedUrl = URL.createObjectURL(blob);
      });
    }
  }

  private buildPedOriginationPayload(): PedOriginationPayload {
    const f = this.form.getRawValue();
    return {
      p_id_ped_origination:            this.ped?.Id_ped_origination ?? 0,
      p_projects_id:                   this.idProject,
      p_ped_ap_result_id:              f.pedApRegionalResult           ?? null,
      p_can_include_anp_or_advc:       f.canIncludeAnpOrAdvc           ?? null,
      p_can_include_psa:               f.canIncludePsa                 ?? null,
      p_requires_commercial_agriculture: f.requiresCommercialAgriculture ?? null,
      p_requires_subsidies:            f.requiresSubsidies             ?? null,
    };
  }

  private buildPedSigPayload(): PedSigPayload {
    const f = this.form.getRawValue();
    return {
      p_id_ped_sig:                    this.ped?.Id_ped_sig ?? 0,
      p_projects_id:                   this.idProject,
      p_pedaa_section_id:              f.seccionPedAA                  ?? null,
      p_aa_population_id:              f.poblacionAaConModelo          ?? null,
      p_agricultural_activity_id:      f.actividadAgropecuaria         ?? null,
      p_survey_id:                     f.encuestas                     ?? null,
      p_aa_subsidy_id:                 f.subsidiosAa                   ?? null,
      p_aa_steep_id:                   f.pendienteAa                   ?? null,
      p_aa_coverage_change_id:         f.cambioCoberturaAa             ?? null,
      p_pedaa_result_id:               f.resultadoPedAaLocal           ?? null,
      p_pedaa_link: this.ped?.pedaa_link?.startsWith('proyectos') ? this.ped.pedaa_link : '',
      p_pedaa_observations:            f.notesLocal                    ?? '',
    };
  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-ORIGINATION'] && !permisos['EDIT-ORIGINATION']) {
          this.pedApFields.forEach(f => this.form.get(f)?.disable());
        }
        if (!permisos['CREATE-SIG'] && !permisos['EDIT-SIG']) {
          this.pedAaFields.forEach(f => this.form.get(f)?.disable());
          this.localFeasibilityFields.forEach(f => this.form.get(f)?.disable());
        }
      }
    });
  }

  private readonly pedApFields = [
    'pedApRegionalResult', 'canIncludeAnpOrAdvc', 'canIncludePsa',
    'requiresCommercialAgriculture', 'requiresSubsidies'
  ];

  private readonly pedAaFields = [
    'seccionPedAA', 'poblacionAaConModelo', 'actividadAgropecuaria',
    'encuestas', 'subsidiosAa', 'pendienteAa', 'cambioCoberturaAa'
  ];

  private readonly localFeasibilityFields = ['resultadoPedAaLocal', 'notesLocal'];

  private validateSection(fields: string[]): boolean {
    const invalid = fields.some(f => this.form.get(f)?.invalid);
    if (invalid) fields.forEach(f => this.form.get(f)?.markAsTouched());
    return !invalid;
  }

  savePedAp(): void {
    if (!this.validateSection(this.pedApFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this._originationService.setPedOrigination(this.buildPedOriginationPayload(), this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedPedAp = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Regional saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Regional' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  savePedAa(): void {
    if (!this.validateSection(this.pedAaFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this._originationService.setPedSig(this.buildPedSigPayload(), [], this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedPedAa = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'PED AA saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save PED AA' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  saveLocalFeasibility(): void {
    if (!this.validateSection(this.localFeasibilityFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;

    const namedFiles: { key: string; file: File }[] = [];
    if (this.pedFile) namedFiles.push({ key: 'docPedFile', file: this.pedFile });

    this._originationService.setPedSig(this.buildPedSigPayload(), namedFiles, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedLocalFeasibility = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Feasibility saved successfully' });
          this.pedFile = null; this.pedUploaded = false; this.pedUploading = false;
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Feasibility' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  onPedUpload(event: { files: File[] }): void {
    this.pedUploading = true;
    this.pedFile      = event.files[0];
    setTimeout(() => {
      this.pedUploading = false;
      this.pedUrl  = URL.createObjectURL(this.pedFile!);
      this.pedPath = this.pedFile?.name || '';
      this.formChangedLocalFeasibility = true;
    }, 500);
  }

  onPedDelete(): void {
    this.pedFile = null; this.pedUploaded = false;
    this.pedUploading = false; this.pedPath = ''; this.pedUrl = '';
    this.formChangedLocalFeasibility = true;
  }

  private applyPedAaRules(): void {
    const seccion = this.form.get('seccionPedAA')?.value;

    const seccion1Fields = [
      'poblacionAaConModelo',
      'actividadAgropecuaria',
      'encuestas',
      'subsidiosAa',
      'pendienteAa',
    ];
    const seccion2Fields = ['cambioCoberturaAa'];

    if (seccion === 1) {
      seccion1Fields.forEach(f => this.form.get(f)?.enable({ emitEvent: false }));  
      seccion2Fields.forEach(f => {
        this.form.get(f)?.disable({ emitEvent: false });
        this.form.get(f)?.reset(null, { emitEvent: false });
      });
    } else if (seccion === 2) {
      seccion1Fields.forEach(f => {
        this.form.get(f)?.disable({ emitEvent: false });  
        this.form.get(f)?.reset(null, { emitEvent: false });
      });
      seccion2Fields.forEach(f => this.form.get(f)?.enable({ emitEvent: false }));  
    } else if (seccion === 3) {
      seccion1Fields.forEach(f => {
        this.form.get(f)?.disable({ emitEvent: false });  
        this.form.get(f)?.reset(null, { emitEvent: false });
      });
      seccion2Fields.forEach(f => this.form.get(f)?.disable({ emitEvent: false }));  
    }
  }
}