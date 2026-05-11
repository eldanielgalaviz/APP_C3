import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { forkJoin, filter } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PrePin } from '../../../../../../interfaces/origination/pre-pin/pre-pin.interface';



@Component({
  selector: 'pre-pin',
  imports: [SHARED_IMPORTS],
  templateUrl: './pre-pin.component.html',
  providers: [MessageService]

})
export class PrePinComponent implements OnInit {

  form!: FormGroup;
  idProject: number = 0;
  token: any;

  prePin!: PrePin;
  programme: any[] = [];
  registrationroute: any[] = [];
  methodology: any[] = [];
  projectcondition: any[] = [];
  licensespermits: any[] = [];
  confidencecrediting: any[] = [];
  estimatepermanence: any[] = [];
  estimatemrv: any[] = [];
  estimateleakage: any[] = [];
  safeguardsapproach: any[] = [];
  socialcommunity: any[] = [];
  shareholdersengagement: any[] = [];
  biodiversitys: any[] = [];
  cths: any[] = [];
  negativeshs: any[] = [];
  indigenouspeople: any[] = [];
  humanright: any[] = [];
  cbacalculator: any[] = [];
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

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
      descriptions:                    ['',   Validators.required],
      certificationProgram:            [null, Validators.required],
      registrationRoute:               [null, Validators.required],
      methodology:                     [null, Validators.required],
      projectArea:                     ['',   Validators.required],
      projectCondition:                [null, Validators.required],
      licencesPermits:                 [null, Validators.required],
      confidenceCreditingActivityArea: [null, Validators.required],
      umafor:                          [null, Validators.required],
      authorizedHarvestingVolume:      [null, Validators.required],
      underlyingActivities:            ['',   Validators.required],
      estimatePermanence:              [null, Validators.required],
      estimateSampleSize:              ['',   Validators.required],
      estimatedMrvReq:                 [null, Validators.required],
      estimatedLeakage:                [null, Validators.required],
      estimatedReversalRisk:           [null, Validators.required],
      percentageMklPrice:              ['',   Validators.required],
      confidenceUpfrontCosts:          ['',   Validators.required],
      cbaCalculatorVersion:            ['',   Validators.required],
      projectIrr:                      ['',   Validators.required],
      creditType:                      ['',   Validators.required],
      safeguardsNoHarm:                [null, Validators.required],
      socialCommunityOnHarm:           [null, Validators.required],
      shareholdersEngagement:          [null, Validators.required],
      pressNegative:                   [null, Validators.required],
      biodiversity:                    [null, Validators.required],
      humanRights:                     [null, Validators.required],
      indigenousPeoples:               [null, Validators.required],
      hAndS:                           [null, Validators.required],
      negativeEhs:                     [null, Validators.required],
    });
    
    this.applyPermissions();

    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });
  }

  loadCatalogsAndData() {
    forkJoin({
      programe:     this._catalogsService.getProgramme(this.token),
      route:        this._catalogsService.getRegistrationRoute(this.token),
      methodology:  this._catalogsService.getMethodology(this.token),
      condition:    this._catalogsService.getProjectCondition(this.token),
      licenses:     this._catalogsService.getLicensesPermits(this.token),
      crediting:    this._catalogsService.getConfidenceCreditingActivityArea(this.token),
      permanence:   this._catalogsService.getEstimatePermanence(this.token),
      mrv:          this._catalogsService.getPrctEstimatedMrvRequirements(this.token),
      cba:          this._catalogsService.getCbaCalculatorVersion(this.token),
      leakage:      this._catalogsService.getEstimateLeakage(this.token),
      safeguards:   this._catalogsService.getSafeguardsNoHarmApproach(this.token),
      social:       this._catalogsService.getSocialCommunityNoHarm(this.token),
      shareholders: this._catalogsService.getShareholdersEngagement(this.token),
      biodiversity: this._catalogsService.getBiodiversity(this.token),
      hs:           this._catalogsService.getHs(this.token),
      negativehs:   this._catalogsService.getNegativeehs(this.token),
      indigenous:   this._catalogsService.getIndigenousPeople(this.token),
      humanrights:  this._catalogsService.getHumanRights(this.token),
    }).subscribe({
      next: (res: any) => {
        this.programme            = res.programe.result;
        this.registrationroute    = res.route.result;
        this.methodology          = res.methodology.result;
        this.projectcondition     = res.condition.result;
        this.licensespermits      = res.licenses.result;
        this.confidencecrediting  = res.crediting.result;
        this.estimatepermanence   = res.permanence.result;
        this.estimatemrv          = res.mrv.result;
        this.cbacalculator        = res.cba.result;
        this.estimateleakage      = res.leakage.result;
        this.safeguardsapproach   = res.safeguards.result;
        this.socialcommunity      = res.social.result;
        this.shareholdersengagement = res.shareholders.result;
        this.biodiversitys        = res.biodiversity.result;
        this.cths                 = res.hs.result;
        this.negativeshs          = res.negativehs.result;
        this.indigenouspeople     = res.indigenous.result;
        this.humanright           = res.humanrights.result;
        this.loadData();
      },
      error: (err) => {
        console.error('Error cargando catálogos:', err);
      }
    });
  }

  loadData() {
    this.originationService.getPrePinAssumptions(this.idProject, this.token).subscribe({
      next: (res: any) => {
        if (res.result && res.result.length > 0) {
          const data: PrePin = res.result[0];
          this.prePin = data;
          this.isInsert = false;
          this.form.patchValue({
            descriptions:                    data.descriptions,
            certificationProgram:            this.programme.find(x => x.Id_programme  === data.id_certification_program),
            registrationRoute:               this.registrationroute.find(x => x.Id_registration_route === data.id_registration_route),
            methodology:                     this.methodology.find(x => x.Id_methodology === data.id_methodology),
            projectArea:                     data.project_area,
            projectCondition:                this.projectcondition.find(x => x.Id_project_condition === data.id_project_condition),
            licencesPermits:                 this.licensespermits.find(x => x.Id_licenses_permits === data.id_licences_permits),
            confidenceCreditingActivityArea: this.confidencecrediting.find(x => x.Id_confidence_crediting_activity_area === data.id_confidence_of_crediting_activity_area),
            umafor: data.id_umafor,
            authorizedHarvestingVolume:      data.authorized_harvesting_volume,
            underlyingActivities:            data.underlying_activities,
            estimatePermanence:              this.estimatepermanence.find(x => x.Id_estimate_permanence === data.id_estimate_permanence),
            estimateSampleSize:              data.estimate_sample_size,
            estimatedMrvReq:                 this.estimatemrv.find(x => x.Id_estimated_mrv_requirements === data.id_estimate_mrv),
            estimatedLeakage:                this.estimateleakage.find(x => x.Id_estimate_leakage === data.id_estimate_leakage),
            estimatedReversalRisk:           data.id_estimate_reversal_risk,
            percentageMklPrice:              data.percentage_mki_price,
            confidenceUpfrontCosts:          data.conficence_upfront_costs,
            cbaCalculatorVersion:            this.cbacalculator.find(x => x.Id_cba_calculator_version === data.cba),
            projectIrr:                      data.irr,
            creditType:                      data.credit_type,
            safeguardsNoHarm:                this.safeguardsapproach.find(x => x.Id_safeguards_no_harm_approach === data.id_safeguards),
            socialCommunityOnHarm:           this.socialcommunity.find(x => x.Id_social_community_no_harm === data.id_social_community),
            shareholdersEngagement:          this.shareholdersengagement.find(x => x.Id_shareholders_engagement === data.id_shareholders),
            pressNegative:                   data.id_press_negative,
            biodiversity:                    this.biodiversitys.find(x => x.Id_biodiversity === data.id_biodiversity),
            humanRights:                     this.humanright.find(x => x.Id_human_rights === data.id_human_rights),
            indigenousPeoples:               this.indigenouspeople.find(x => x.Id_indigenouspeople === data.id_indigenous_people),
            hAndS:                           this.cths.find(x => x.Id_hs === data.id_h_s),
            negativeEhs:                     this.negativeshs.find(x => x.Id_negative_ehs === data.id_negative_ehs),
          });
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
      p_Id_project:                              this.idProject,
      p_descriptions:                            this.form.value.descriptions,
      p_id_certification_program:                this.form.value.certificationProgram?.Id_programme,
      p_id_registration_route:                   this.form.value.registrationRoute?.Id_registration_route,
      p_id_methodology:                          this.form.value.methodology?.Id_methodology,
      p_project_area:                            this.form.value.projectArea,
      p_id_project_condition:                    this.form.value.projectCondition?.Id_project_condition,
      p_id_licences_permits:                     this.form.value.licencesPermits?.Id_licenses_permits,
      p_id_confidence_of_crediting_activity_area: this.form.value.confidenceCreditingActivityArea?.Id_confidence_crediting_activity_area,
      p_id_umafor:                               this.form.value.umafor,
      p_authorizedHarvestingVolume:              this.form.value.authorizedHarvestingVolume,
      p_underlying_activities:                   this.form.value.underlyingActivities,
      p_id_estimate_permanence:                  this.form.value.estimatePermanence?.Id_estimate_permanence,
      p_estimate_sample_size:                    this.form.value.estimateSampleSize,
      p_id_estimate_mrv:                         this.form.value.estimatedMrvReq?.Id_estimated_mrv_requirements,
      p_id_estimate_leakage:                     this.form.value.estimatedLeakage?.Id_estimate_leakage,
      p_id_estimate_reversal_risk:               this.form.value.estimatedReversalRisk,
      p_percentage_mki_price:                    this.form.value.percentageMklPrice,
      p_conficence_upfront_costs:                this.form.value.confidenceUpfrontCosts,
      p_cba:                                     this.form.value.cbaCalculatorVersion?.Id_cba_calculator_version,
      p_irr:                                     this.form.value.projectIrr,
      p_credit_type:                             this.form.value.creditType,
      p_id_safeguards:                           this.form.value.safeguardsNoHarm?.Id_safeguards_no_harm_approach,
      p_id_social_community:                     this.form.value.socialCommunityOnHarm?.Id_social_community_no_harm,
      p_id_shareholders:                         this.form.value.shareholdersEngagement?.Id_shareholders_engagement,
      p_id_press_negative:                       this.form.value.pressNegative,
      p_id_biodiversity:                         this.form.value.biodiversity?.Id_biodiversity,
      p_id_human_rights:                         this.form.value.humanRights?.Id_human_rights,
      p_id_indigenous_people:                    this.form.value.indigenousPeoples?.Id_indigenouspeople,
      p_id_h_s:                                  this.form.value.hAndS?.Id_hs,
      p_id_negative_ehs:                         this.form.value.negativeEhs?.Id_negative_ehs,
    };

    this.originationService.setPrePinAssumptions(payload, this.token).subscribe({
    next: (res: any) => {
      if (res.valido === 1) {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
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

  applyPermissions(): void {
    this.canEdit   = this.authService.hasPermission(this.router.url, 'EDIT');
    this.canCreate = this.authService.hasPermission(this.router.url, 'CREATE');

    if (!this.canEdit && !this.canCreate) {
      this.form.disable();
    }
  }
}