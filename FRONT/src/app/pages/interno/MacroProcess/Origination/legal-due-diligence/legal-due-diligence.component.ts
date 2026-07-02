import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { LegalDueDiligence } from '../../../../../../service/Origination/origination-legal-due-diligence.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { legalDueDiligence, LegalDueDiligencePayload } from '../../../../../interfaces/origination/LegalDueDiligence/LegalDueDiligence.interface';
import { LeadLegalCat, LegalDDStatus, YesNoOption } from '../../../../../interfaces/origination/LegalDueDiligence/legal-due-diligence-catalogs.interface';
import { PermissionUser } from '../../../../../../utils/permission-user.service';

@Component({
  selector: 'app-legal-due-diligence',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './legal-due-diligence.component.html',
  providers: [MessageService]
})
export class LegalDueDiligenceComponent implements OnInit {

  private _fb                      = inject(FormBuilder);
  private _observableService       = inject(ObservableService);
  private _authGuardService        = inject(authGuardService);
  private _messageService          = inject(MessageService);
  private _legalDueDiligenceService = inject(LegalDueDiligence);
  private _permissionUser          = inject(PermissionUser);

  token: string = this._authGuardService.getToken() || '';

  /** Estado */
  idProject: number                    = 0;
  isInsert: boolean                    = true;
  isSaving: boolean                    = false;
  legalDueDiligenceData!: legalDueDiligence;
  permissions: Record<string, boolean> = {};
  data: legalDueDiligence | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;

  /** Opciones estáticas */
  yesNoOptions: YesNoOption[] = [
    { name: 'Yes', value: 1 },
    { name: 'No',  value: 0 },
  ];


  /** Formulario */
  form = this._fb.group({
    loiSignedDate:                 [null as Date   | null, Validators.required],
    cbRequestedToRanDate:          [null as Date   | null, Validators.required],
    cbCompleted:                   [null as number | null, Validators.required],
    erpaSignedDate:                [null as Date   | null, Validators.required],
    buyer:                         ['',                    Validators.required],
    projectAggregator:             ['',                    Validators.required],
    projectDeveloper:              ['',                    Validators.required],
    projectCoordinator:            ['',                    Validators.required],
    projectCoordinatorTerm:        [null as Date   | null, Validators.required],
    specificConditionsPrescendent: ['',                    Validators.required],
    notesLegalTeam:                ['',                    Validators.required],
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit(): void {
    this.loadPermissions();
    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadData();
      }
    });
    this.form.valueChanges.subscribe(() => {
    this.formChanged = true;
  });   
  }

  loadData(): void {
    this._legalDueDiligenceService.getLegalDueDiligence(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.legalDueDiligenceData = res.result[0] as legalDueDiligence;
          this.data = this.legalDueDiligenceData;
          this.hasData = true;
          this.formChanged = false;
          this.isInsert              = false;
          this.patchForm();
        } else {
          this.isInsert = true;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error cargando legal due diligence:', err)
    });
  }

  patchForm(): void {
    const d = this.legalDueDiligenceData;
    this.form.patchValue({
      loiSignedDate:                 d.loi_signed_date                  ? new Date(d.loi_signed_date)                  : null,
      cbRequestedToRanDate:          d.cd_requested_to_ran              ? new Date(d.cd_requested_to_ran)              : null,
      cbCompleted:                   d.cb_completed,
      erpaSignedDate:                d.erpa_signed_date                 ? new Date(d.erpa_signed_date)                 : null,
      buyer:                         d.buyer,
      projectAggregator:             d.project_aggregator,
      projectDeveloper:              d.project_developer,
      projectCoordinator:            d.project_coordinator,
      projectCoordinatorTerm:        d.project_coordinator_term_date    ? new Date(d.project_coordinator_term_date)    : null,
      specificConditionsPrescendent: d.specific_conditions_prescedent,
      notesLegalTeam:                d.notes_legal_team,
    }, { emitEvent: false });
  }

  private formatDate(date: Date | null): string | null {
    if (!date) return null;
    return new Date(date).toISOString().split('T')[0];
  }

  saveForm(): void {

    if (this.isSaving) return;
    this.isSaving = true;

    const f = this.form.value;

    const payload: LegalDueDiligencePayload = {
      p_Id_project:                     this.idProject,
      p_loi_signed_date:                this.formatDate(f.loiSignedDate               ?? null),
      p_cd_requested_to_ran:            this.formatDate(f.cbRequestedToRanDate        ?? null),
      p_cb_completed:                   f.cbCompleted                   ?? null,
      p_erpa_signed_date:               this.formatDate(f.erpaSignedDate              ?? null),
      p_buyer:                          f.buyer                          ?? null,
      p_project_aggregator:             f.projectAggregator              ?? null,
      p_project_developer:              f.projectDeveloper               ?? null,
      p_project_coordinator:            f.projectCoordinator             ?? null,
      p_project_coordinator_term_date:  this.formatDate(f.projectCoordinatorTerm      ?? null),
      p_specific_conditions_prescedent: f.specificConditionsPrescendent  ?? null,
      p_notes_legal_team:               f.notesLegalTeam                 ?? null,
    };

    this._legalDueDiligenceService.setLegalDueDiligence(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Legal Due Diligence' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Legal Due Diligence' });
      }
    });
  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-LEGAL'] && !permisos['EDIT-LEGAL']) {
          this.form.disable();
        }
      }
    });
  }
}