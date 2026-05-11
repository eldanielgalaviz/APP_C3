import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { CatalogsService } from '../../../../../../service/Origination/origination-catalogs.service';
import { LegalDueDiligence } from '../../../../../../service/Origination/origination-legal-due-diligence.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { Router } from '@angular/router';
import { legalDueDiligence } from '../../../../../interfaces/origination/LegalDueDiligence/LegalDueDiligence.interface';

@Component({
  selector: 'app-legal-due-diligence',
  imports: [SHARED_IMPORTS],
  templateUrl: './legal-due-diligence.component.html',
  providers: [MessageService]
})
export class LegalDueDiligenceComponent implements OnInit {

  token: any;
  idProject: number = 0;
  form!: FormGroup;

  // Catálogos
  leadLegal: any[] = [];
  legalDDStatus: any[] = [];
  mekycStatus: any[] = [];
  state: any[] = [];
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

  // Data cargada del GET
  legalDueDiligenceData!: legalDueDiligence;

  constructor(
    private fb: FormBuilder,
    private _catalogsService: CatalogsService,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private _legalDueDiligenceService: LegalDueDiligence,
    private router: Router,
    private authService: authGuardService
  ) {
    this.token = this._authGuardService.getToken();
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit() {
    this.state = [
      { name: 'Yes', value: 1 },
      { name: 'No',  value: 0 },
    ];
    this.initForm();
    this.applyPermissions();
    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      legalLead:                     [null, Validators.required],
      legalDueDiligenceStatus:       [null, Validators.required],
      loiSignedDate:                 [null, Validators.required],
      kycCompleted:                  [null, Validators.required],
      cbRequestedToRanDate:          [null, Validators.required],
      cbCompleted:                   [null, Validators.required],
      erpaSignedDate:                [null, Validators.required],
      buyer:                         [null, Validators.required],
      projectAggregator:             [null, Validators.required],
      projectDeveloper:              [null, Validators.required],
      projectCoordinator:            [null, Validators.required],
      projectCoordinatorTerm:        [null, Validators.required],
      kycToMeSubmissionDate:         [null, Validators.required],
      meKycStatus:                   [null, Validators.required],
      kyc:                           [null, Validators.required],
      specificConditionsPrescendent: ['',   Validators.required],
      notesLegalTeam:                ['',   Validators.required]
    });
  }

  loadCatalogsAndData() {
    forkJoin({
      leadLegal:    this._catalogsService.getLeadLegal(this.token),
      legalDDStatus: this._catalogsService.getLegalDDStatus(this.token),
      mekycStatus:  this._catalogsService.getMekycStatus(this.token),
    }).subscribe({
      next: (res: any) => {
        this.leadLegal     = res.leadLegal.result;
        this.legalDDStatus = res.legalDDStatus.result;
        this.mekycStatus   = res.mekycStatus.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData() {
    this._legalDueDiligenceService.getLegalDueDiligence(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.legalDueDiligenceData = res.result[0] as legalDueDiligence;
            this.isInsert = false;
          this.patchForm();
        } else {
          this.isInsert = true;

        }
      },
      error: (err) => console.error('Error cargando legal due diligence:', err)
    });
  }

  patchForm() {
    const d = this.legalDueDiligenceData;
    this.form.patchValue({
      legalLead:                     d.id_legal_lead,
      legalDueDiligenceStatus:       d.id_legal_dd_status,
      loiSignedDate:                 d.loi_signed_date ? new Date(d.loi_signed_date) : null,
      kycCompleted:                  d.kyc_completed,
      cbRequestedToRanDate:          d.cd_requested_to_ran ? new Date(d.cd_requested_to_ran) : null,
      cbCompleted:                   d.cb_completed,
      erpaSignedDate:                d.erpa_signed_date ? new Date(d.erpa_signed_date) : null,
      buyer:                         d.buyer,
      projectAggregator:             d.project_aggregator,
      projectDeveloper:              d.project_developer,
      projectCoordinator:            d.project_coordinator,
      projectCoordinatorTerm:        d.project_coordinator_term_date ? new Date(d.project_coordinator_term_date) : null,
      kycToMeSubmissionDate:         d.kyc_submission_date ? new Date(d.kyc_submission_date) : null,
      meKycStatus:                   d.id_mekyc_status,
      kyc:                           d.kyc,
      specificConditionsPrescendent: d.specific_conditions_prescedent,
      notesLegalTeam:                d.notes_legal_team,
    });
  }

  formatDate(date: any): string | null {
    if (!date) return null;
    const d = new Date(date);
    return d.toISOString().split('T')[0]; 
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;

    const data = {
      p_Id_project:                      this.idProject,
      p_id_legal_lead:                   f.legalLead,
      p_id_legal_dd_status:              f.legalDueDiligenceStatus,
      p_loi_signed_date:                 this.formatDate(f.loiSignedDate),
      p_kyc_completed:                   f.kycCompleted,
      p_cd_requested_to_ran:             this.formatDate(f.cbRequestedToRanDate),
      p_cb_completed:                    f.cbCompleted,
      p_erpa_signed_date:                this.formatDate(f.erpaSignedDate),
      p_buyer:                           f.buyer,
      p_project_aggregator:              f.projectAggregator,
      p_project_developer:               f.projectDeveloper,
      p_project_coordinator:             f.projectCoordinator,
      p_project_coordinator_term_date:   this.formatDate(f.projectCoordinatorTerm),
      p_kyc_submission_date:             this.formatDate(f.kycToMeSubmissionDate),
      p_id_mekyc_status:                 f.meKycStatus,
      p_kyc:                             f.kyc,
      p_specific_conditions_prescedent:  f.specificConditionsPrescendent,
      p_notes_legal_team:                f.notesLegalTeam,
    };

    this._legalDueDiligenceService.setLegalDueDiligence(data, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadCatalogsAndData();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Legal Due Diligence' });
        console.error('Error saving:', err);
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