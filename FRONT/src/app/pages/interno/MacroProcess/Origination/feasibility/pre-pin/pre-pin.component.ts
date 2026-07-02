import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { PrePin } from '../../../../../../interfaces/origination/pre-pin/pre-pin.interface';
import { PrePinOriginationPayload, PrePinMrvPayload, PrePinSafeguardsPayload } from '../../../../../../interfaces/origination/pre-pin/pre-pin-payload.interface';
import {
  Programme, RegistrationRoute, Methodology, ProjectCondition,
  LicensesPermits, ConfidenceCreditingActivityArea, EstimatePermanence,
  EstimatedMrvRequirements, CbaCalculatorVersion, EstimateLeakage,
  SafeguardsNoHarmApproach, SocialCommunityNoHarm, ShareholdersEngagement,
  Biodiversity, Hs, NegativeEhs, IndigenousPeople, HumanRights,
  BufferPool, InventoryStratification, PressNegative, GrievanceMechanism
} from '../../../../../../interfaces/origination/pre-pin/pre-pin-catalogs.interface';
import { PermissionUser } from '../../../../../../../utils/permission-user.service';

@Component({
  selector: 'pre-pin',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './pre-pin.component.html',
  providers: [MessageService]
})
export class PrePinComponent implements OnInit, OnDestroy {

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
  prePin: PrePin | undefined;
  permissions: Record<string, boolean>   = {};
  isSaving:    boolean                   = false;

  hasDataOrigination:  boolean = false;
  hasDataMRV:          boolean = false;
  hasDataSafeguards:   boolean = false;

  formChangedOrigination:  boolean = false;
  formChangedMRV:          boolean = false;
  formChangedSafeguards:   boolean = false;

  formChangedDescription:  boolean = false;
  formChangedCertification: boolean = false;
  formChangedTechnical:    boolean = false;
  formChangedEconomics:    boolean = false;


  /** Catálogos */
  programme:               Programme[]                       = [];
  registrationroute:       RegistrationRoute[]               = [];
  methodology:             Methodology[]                     = [];
  projectcondition:        ProjectCondition[]                = [];
  licensespermits:         LicensesPermits[]                 = [];
  confidencecrediting:     ConfidenceCreditingActivityArea[] = [];
  estimatepermanence:      EstimatePermanence[]              = [];
  estimatemrv:             EstimatedMrvRequirements[]        = [];
  cbacalculator:           CbaCalculatorVersion[]            = [];
  estimateleakage:         EstimateLeakage[]                 = [];
  safeguardsapproach:      SafeguardsNoHarmApproach[]        = [];
  socialcommunity:         SocialCommunityNoHarm[]           = [];
  shareholdersengagement:  ShareholdersEngagement[]          = [];
  biodiversitys:           Biodiversity[]                    = [];
  cths:                    Hs[]                              = [];
  negativeshs:             NegativeEhs[]                     = [];
  indigenouspeople:        IndigenousPeople[]                = [];
  humanright:              HumanRights[]                     = [];
  bufferpool:              BufferPool[]                      = [];
  inventorystratification: InventoryStratification[]         = [];
  pressnegative:           PressNegative[]                   = [];
  grievancemechanism:      GrievanceMechanism[]              = [];

  /** Formulario */
  form = this._fb.group({
    // origination
    descriptions:                    ['',   Validators.required],
    certificationProgram:            [null as Programme                       | null, Validators.required],
    registrationRoute:               [null as RegistrationRoute               | null, Validators.required],
    methodology:                     [null as Methodology                     | null, Validators.required],
    projectArea:                     ['',   Validators.required],
    projectCondition:                [null as ProjectCondition                | null, Validators.required],
    licencesPermits:                 [null as LicensesPermits                 | null, Validators.required],
    confidenceCreditingActivityArea: [null as ConfidenceCreditingActivityArea | null, Validators.required],
    umafor:                          [''],
    authorizedHarvestingVolume:      [null as number | null],
    underlyingActivities:            [''],
    percentageMklPrice:              [null as number | null, Validators.required],
    confidenceUpfrontCosts:          ['',   Validators.required],
    cbaCalculatorVersion:            [null as CbaCalculatorVersion            | null, Validators.required],
    projectIrr:                      ['',   Validators.required],
    creditType:                      ['',   Validators.required],
    // mrv
    estimatePermanence:              [null as EstimatePermanence              | null],
    estimateSampleSize:              [''],
    estimatedMrvReq:                 [null as EstimatedMrvRequirements        | null],
    estimatedLeakage:                [null as EstimateLeakage                 | null],
    estimatedReversalRisk:           [''],
    bufferPool:                      [null as BufferPool                      | null],
    inventoryStratification:         [null as InventoryStratification         | null],
    // safeguards
    safeguardsNoHarm:                [null as SafeguardsNoHarmApproach        | null],
    socialCommunityOnHarm:           [null as SocialCommunityNoHarm           | null],
    shareholdersEngagement:          [null as ShareholdersEngagement          | null],
    pressNegative:                   [null as PressNegative                   | null],
    biodiversity:                    [null as Biodiversity                    | null],
    humanRights:                     [null as HumanRights                     | null],
    indigenousPeoples:               [null as IndigenousPeople                | null],
    hAndS:                           [null as Hs                              | null],
    negativeEhs:                     [null as NegativeEhs                     | null],
    grievanceMechanism:              [null as GrievanceMechanism              | null],
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
    this.descriptionFields.forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedDescription = true;
      });
      if (sub) this.formSubs.add(sub);
    });

    this.certificationFields.forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedCertification = true;
      });
      if (sub) this.formSubs.add(sub);
    });

    this.technicalFields.forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedTechnical = true;
      });
      if (sub) this.formSubs.add(sub);
    });

    this.economicsFields.forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedEconomics = true;
      });
      if (sub) this.formSubs.add(sub);
    });

    this.mrvFields.forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedMRV = true;
      });
      if (sub) this.formSubs.add(sub);
    });

    this.safeguardsFields.forEach(f => {
      const sub = this.form.get(f)?.valueChanges.subscribe(() => {
        this.formChangedSafeguards = true;
      });
      if (sub) this.formSubs.add(sub);
    });
  }

  loadCatalogsAndData(): void {
    forkJoin({
      programe:        this._catalogsService.getProgramme(this.token),
      route:           this._catalogsService.getRegistrationRoute(this.token),
      methodology:     this._catalogsService.getMethodology(this.token),
      condition:       this._catalogsService.getProjectCondition(this.token),
      licenses:        this._catalogsService.getLicensesPermits(this.token),
      crediting:       this._catalogsService.getConfidenceCreditingActivityArea(this.token),
      permanence:      this._catalogsService.getEstimatePermanence(this.token),
      mrv:             this._catalogsService.getPrctEstimatedMrvRequirements(this.token),
      cba:             this._catalogsService.getCbaCalculatorVersion(this.token),
      leakage:         this._catalogsService.getEstimateLeakage(this.token),
      safeguards:      this._catalogsService.getSafeguardsNoHarmApproach(this.token),
      social:          this._catalogsService.getSocialCommunityNoHarm(this.token),
      shareholders:    this._catalogsService.getShareholdersEngagement(this.token),
      biodiversity:    this._catalogsService.getBiodiversity(this.token),
      hs:              this._catalogsService.getHs(this.token),
      negativehs:      this._catalogsService.getNegativeehs(this.token),
      indigenous:      this._catalogsService.getIndigenousPeople(this.token),
      humanrights:     this._catalogsService.getHumanRights(this.token),
      bufferpool:      this._catalogsService.getBufferPool(this.token),
      inventory:       this._catalogsService.getInventoryStratification(this.token),
      pressnegative:   this._catalogsService.getPressNegative(this.token),
      grievance:       this._catalogsService.getGrievanceMechanism(this.token),
    }).subscribe({
      next: (res) => {
        this.programme               = res.programe.result;
        this.registrationroute       = res.route.result;
        this.methodology             = res.methodology.result;
        this.projectcondition        = res.condition.result;
        this.licensespermits         = res.licenses.result;
        this.confidencecrediting     = res.crediting.result;
        this.estimatepermanence      = res.permanence.result;
        this.estimatemrv             = res.mrv.result;
        this.cbacalculator           = res.cba.result;
        this.estimateleakage         = res.leakage.result;
        this.safeguardsapproach      = res.safeguards.result;
        this.socialcommunity         = res.social.result;
        this.shareholdersengagement  = res.shareholders.result;
        this.biodiversitys           = res.biodiversity.result;
        this.cths                    = res.hs.result;
        this.negativeshs             = res.negativehs.result;
        this.indigenouspeople        = res.indigenous.result;
        this.humanright              = res.humanrights.result;
        this.bufferpool              = res.bufferpool.result;
        this.inventorystratification = res.inventory.result;
        this.pressnegative           = res.pressnegative.result;
        this.grievancemechanism      = res.grievance.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(): void {
    this._originationService.getPrePinAssumptions(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.result && res.result.length > 0) {
          const data = res.result[0] as PrePin;
          this.prePin   = data;
          this.isInsert = false;
          this.form.patchValue({
            // origination
            descriptions:                    data.descriptions,
            certificationProgram:            this.programme.find(x => x.Id_programme === data.id_certification_program) || null,
            registrationRoute:               this.registrationroute.find(x => x.Id_registration_route === data.id_registration_route) || null,
            methodology:                     this.methodology.find(x => x.Id_methodology === data.id_methodology) || null,
            projectArea:                     data.project_area,
            projectCondition:                this.projectcondition.find(x => x.Id_project_condition === data.id_project_condition) || null,
            licencesPermits:                 this.licensespermits.find(x => x.Id_licenses_permits === data.id_licences_permits) || null,
            confidenceCreditingActivityArea: this.confidencecrediting.find(x => x.Id_confidence_crediting_activity_area === data.id_confidence_of_crediting_activity_area) || null,
            umafor:                          data.id_umafor,
            authorizedHarvestingVolume:      data.authorized_harvesting_volume,
            underlyingActivities:            data.underlying_activities,
            percentageMklPrice:              data.percentage_mki_price,
            confidenceUpfrontCosts:          String(data.conficence_upfront_costs),
            cbaCalculatorVersion:            this.cbacalculator.find(x => x.Id_cba_calculator_version === data.cba) || null,
            projectIrr:                      String(data.irr),
            creditType:                      data.credit_type,
            // mrv
            estimatePermanence:              this.estimatepermanence.find(x => x.Id_estimate_permanence === data.id_estimate_permanence) || null,
            estimateSampleSize:              data.estimate_sample_size,
            estimatedMrvReq:                 this.estimatemrv.find(x => x.Id_estimated_mrv_requirements === data.id_estimate_mrv) || null,
            estimatedLeakage:                this.estimateleakage.find(x => x.Id_estimate_leakage === data.id_estimate_leakage) || null,
            estimatedReversalRisk:           data.id_estimate_reversal_risk,
            bufferPool:                      this.bufferpool.find(x => x.Id_buffer_pool === data.Id_buffer_pool) || null,
            inventoryStratification:         this.inventorystratification.find(x => x.Id_inventory_stratification === data.Id_inventory_stratification) || null,
            // safeguards
            safeguardsNoHarm:                this.safeguardsapproach.find(x => x.Id_safeguards_no_harm_approach === data.id_safeguards) || null,
            socialCommunityOnHarm:           this.socialcommunity.find(x => x.Id_social_community_no_harm === data.id_social_community) || null,
            shareholdersEngagement:          this.shareholdersengagement.find(x => x.Id_shareholders_engagement === data.id_shareholders) || null,
            pressNegative:                   this.pressnegative.find(x => x.Id_press_negative === data.id_press_negative) || null,
            biodiversity:                    this.biodiversitys.find(x => x.Id_biodiversity === data.id_biodiversity) || null,
            humanRights:                     this.humanright.find(x => x.Id_human_rights === data.id_human_rights) || null,
            indigenousPeoples:               this.indigenouspeople.find(x => x.Id_indigenouspeople === data.id_indigenous_people) || null,
            hAndS:                           this.cths.find(x => x.Id_hs === data.id_h_s) || null,
            negativeEhs:                     this.negativeshs.find(x => x.Id_negative_ehs === data.id_negative_ehs) || null,
            grievanceMechanism:              this.grievancemechanism.find(x => x.Id_grievance_mechanism === data.Id_grievance_mechanism) || null,
          }, { emitEvent: false });
          this.hasDataOrigination = !!data.Id_pre_pin_origination;
          this.hasDataMRV         = !!data.Id_pre_pin_mrv;
          this.hasDataSafeguards  = !!data.Id_pre_pin_safeguards;

          this.formChangedDescription   = false;
          this.formChangedCertification = false;
          this.formChangedTechnical     = false;
          this.formChangedEconomics     = false;
          this.formChangedMRV           = false;
          this.formChangedSafeguards    = false;

        } else {
          this.isInsert = true;
        }
      },
      error: (err) => console.error('Error cargando pre-pin:', err)
    });
  }

  private buildOriginationPayload(): PrePinOriginationPayload {
    const f = this.form.getRawValue();
    return {
      p_Id_project:                               this.idProject,
      p_descriptions:                             f.descriptions                               ?? '',
      p_id_certification_program:                 f.certificationProgram?.Id_programme,
      p_id_registration_route:                    f.registrationRoute?.Id_registration_route,
      p_id_methodology:                           f.methodology?.Id_methodology,
      p_project_area:                             f.projectArea                                ?? '',
      p_id_project_condition:                     f.projectCondition?.Id_project_condition,
      p_id_licences_permits:                      f.licencesPermits?.Id_licenses_permits,
      p_id_confidence_of_crediting_activity_area: f.confidenceCreditingActivityArea?.Id_confidence_crediting_activity_area,
      p_id_umafor:                                f.umafor                                     ?? null,
      p_authorizedHarvestingVolume:               f.authorizedHarvestingVolume                 ?? null,
      p_underlying_activities:                    f.underlyingActivities                       ?? '',
      p_percentage_mki_price:                     f.percentageMklPrice                         ?? null,
      p_conficence_upfront_costs:                 f.confidenceUpfrontCosts                     ?? '',
      p_cba:                                      f.cbaCalculatorVersion?.Id_cba_calculator_version,
      p_irr:                                      f.projectIrr                                 ?? '',
      p_credit_type:                              f.creditType                                 ?? '',
    };
  }

  private buildMrvPayload(): PrePinMrvPayload {
    const f = this.form.getRawValue();
    return {
      p_Id_project:                  this.idProject,
      p_id_estimate_permanence:      f.estimatePermanence?.Id_estimate_permanence,
      p_estimate_sample_size:        f.estimateSampleSize        ?? '',
      p_id_estimate_mrv:             f.estimatedMrvReq?.Id_estimated_mrv_requirements,
      p_id_estimate_leakage:         f.estimatedLeakage?.Id_estimate_leakage,
      p_id_estimate_reversal_risk:   f.estimatedReversalRisk     ?? null,
      p_Id_buffer_pool:              f.bufferPool?.Id_buffer_pool,
      p_Id_inventory_stratification: f.inventoryStratification?.Id_inventory_stratification,
    };
  }

  private buildSafeguardsPayload(): PrePinSafeguardsPayload {
    const f = this.form.getRawValue();
    return {
      p_Id_project:             this.idProject,
      p_id_safeguards:          f.safeguardsNoHarm?.Id_safeguards_no_harm_approach,
      p_id_social_community:    f.socialCommunityOnHarm?.Id_social_community_no_harm,
      p_id_shareholders:        f.shareholdersEngagement?.Id_shareholders_engagement,
      p_id_press_negative:      f.pressNegative?.Id_press_negative,
      p_id_biodiversity:        f.biodiversity?.Id_biodiversity,
      p_id_human_rights:        f.humanRights?.Id_human_rights,
      p_id_indigenous_people:   f.indigenousPeoples?.Id_indigenouspeople,
      p_id_h_s:                 f.hAndS?.Id_hs,
      p_id_negative_ehs:        f.negativeEhs?.Id_negative_ehs,
      p_Id_grievance_mechanism: f.grievanceMechanism?.Id_grievance_mechanism,
    };
  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-ORIGINATION'] && !permisos['EDIT-ORIGINATION']) {
          this.oriFields.forEach(f => this.form.get(f)?.disable());
        }
        if (!permisos['CREATE-MRV'] && !permisos['EDIT-MRV']) {
          this.mrvFields.forEach(f => this.form.get(f)?.disable());
        }
        if (!permisos['CREATE-SAFEGUARDS'] && !permisos['EDIT-SAFEGUARDS']) {
          this.safeguardsFields.forEach(f => this.form.get(f)?.disable());
        }
      }
    });
  }

  private readonly descriptionFields = ['descriptions'];

  private readonly certificationFields = ['certificationProgram', 'registrationRoute', 'methodology'];

  private readonly technicalFields = [
    'projectArea', 'projectCondition', 'licencesPermits', 'confidenceCreditingActivityArea',
    'umafor', 'authorizedHarvestingVolume', 'underlyingActivities'
  ];

  private readonly economicsFields = [
    'percentageMklPrice', 'confidenceUpfrontCosts', 'cbaCalculatorVersion', 'projectIrr', 'creditType'
  ];

  private readonly mrvFields = [
    'estimatePermanence', 'estimateSampleSize', 'estimatedMrvReq',
    'estimatedLeakage', 'estimatedReversalRisk', 'bufferPool', 'inventoryStratification'
  ];

  private readonly safeguardsFields = [
    'safeguardsNoHarm', 'socialCommunityOnHarm', 'shareholdersEngagement',
    'pressNegative', 'biodiversity', 'humanRights', 'indigenousPeoples',
    'hAndS', 'negativeEhs', 'grievanceMechanism'
  ];

  private readonly oriFields = [
    ...this.descriptionFields, ...this.certificationFields,
    ...this.technicalFields, ...this.economicsFields
  ];

  private validateSection(fields: string[]): boolean {
    const invalid = fields.some(f => this.form.get(f)?.invalid);
    if (invalid) {
      fields.forEach(f => this.form.get(f)?.markAsTouched());
    }
    return !invalid;
  }

saveDescription(): void {
    if (!this.validateSection(this.descriptionFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this._originationService.setPrePinOrigination(this.buildOriginationPayload(), this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedDescription  = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Description saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Description' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  saveCertification(): void {
    if (!this.validateSection(this.certificationFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this._originationService.setPrePinOrigination(this.buildOriginationPayload(), this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedCertification = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Certification' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  saveTechnical(): void {
    if (!this.validateSection(this.technicalFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this._originationService.setPrePinOrigination(this.buildOriginationPayload(), this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedTechnical = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Technical assumptions saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Technical assumptions' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  saveEconomics(): void {
    if (!this.validateSection(this.economicsFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this._originationService.setPrePinOrigination(this.buildOriginationPayload(), this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedEconomics = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Economics saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Economics' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  saveMRV(): void {
    if (!this.validateSection(this.mrvFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this._originationService.setPrePinMrv(this.buildMrvPayload(), this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedMRV = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'MRV saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save MRV' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  saveSafeguards(): void {
    if (!this.validateSection(this.safeguardsFields)) return;
    if (this.isSaving) return;
    this.isSaving = true;
    this._originationService.setPrePinSafeguards(this.buildSafeguardsPayload(), this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this.formChangedSafeguards = false;
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Safeguards saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Safeguards' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }
}