import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { Contracting } from '../../../../../../service/Origination/origination-contrating.service';
import { ContractingPayload, Contracting as ContractingItem } from '../../../../../interfaces/origination/contrating/contracting.interface';
import { PermissionUser } from '../../../../../../utils/permission-user.service';

@Component({
  selector: 'app-contracting',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './contracting.component.html',
  providers: [MessageService]
})
export class ContractingComponent implements OnInit {

  private _fb                 = inject(FormBuilder);
  private _observableService  = inject(ObservableService);
  private _authGuardService   = inject(authGuardService);
  private _messageService     = inject(MessageService);
  private _contracting        = inject(Contracting);
  private _permissionUser     = inject(PermissionUser);

  token: string = this._authGuardService.getToken() || '';

  /** Estado */
  idProject: number                    = 0;
  isInsert: boolean                    = true;
  isSaving: boolean                    = false;
  contractingData!: ContractingItem;
  permissions: Record<string, boolean> = {};
  data: ContractingItem | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;

  /** Formulario */
  form = this._fb.group({
    erpaSignedByBuyer:                                        [null as Date | null],
    erpaSignedByProjectCounterpart:                           [null as Date | null],
    projectDeveloperContractSignedByProjectCounterpart:       [null as Date | null],
    aggregationApprovalSignedByProjectCounterpart:            [null as Date | null],
    authorityDesignationFormatSigned:                         [null as Date | null],
    termsOfUseSignedByProjectCounterpart:                     [null as Date | null],
    projectDeveloperContractSignedByCanopia:                  [null as Date | null],
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
    this._contracting.getContrating(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.contractingData = res.result[0] as ContractingItem;
          this.data = this.contractingData;
          this.hasData = true;
          this.formChanged = false;
          this.isInsert        = false;
          this.patchForm();
        } else {
          this.isInsert = true;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error cargando contracting:', err)
    });
  }

  patchForm(): void {
    const d = this.contractingData;
    this.form.patchValue({
      erpaSignedByBuyer:                                        d.erpa_signed_by_buyer                                       ? new Date(d.erpa_signed_by_buyer)                                       : null,
      erpaSignedByProjectCounterpart:                           d.erpa_signed_by_project_counterpart                         ? new Date(d.erpa_signed_by_project_counterpart)                         : null,
      projectDeveloperContractSignedByProjectCounterpart:       d.project_developer_contract_signed_by_project_counterpart   ? new Date(d.project_developer_contract_signed_by_project_counterpart)   : null,
      aggregationApprovalSignedByProjectCounterpart:            d.aggregation_approval_signed_by_project_counterpart         ? new Date(d.aggregation_approval_signed_by_project_counterpart)         : null,
      authorityDesignationFormatSigned:                         d.authority_designation_format_signed                        ? new Date(d.authority_designation_format_signed)                        : null,
      termsOfUseSignedByProjectCounterpart:                     d.terms_of_use_signed_project_counterpart                    ? new Date(d.terms_of_use_signed_project_counterpart)                    : null,
      projectDeveloperContractSignedByCanopia:                  d.project_developer_contract_signed_by_canopia               ? new Date(d.project_developer_contract_signed_by_canopia)               : null,
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

    const payload: ContractingPayload = {
      p_Id_project:                                                   this.idProject,
      p_erpa_signed_by_buyer:                                         this.formatDate(f.erpaSignedByBuyer                                     ?? null),
      p_erpa_signed_by_project_counterpart:                           this.formatDate(f.erpaSignedByProjectCounterpart                        ?? null),
      p_project_developer_contract_signed_by_project_counterpart:     this.formatDate(f.projectDeveloperContractSignedByProjectCounterpart    ?? null),
      p_aggregation_approval_signed_by_project_counterpart:           this.formatDate(f.aggregationApprovalSignedByProjectCounterpart         ?? null),
      p_authority_designation_format_signed:                          this.formatDate(f.authorityDesignationFormatSigned                      ?? null),
      p_terms_of_use_signed_project_counterpart:                      this.formatDate(f.termsOfUseSignedByProjectCounterpart                  ?? null),
      p_project_developer_contract_signed_by_canopia:                 this.formatDate(f.projectDeveloperContractSignedByCanopia               ?? null),
    };

    this._contracting.setContrating(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Contracting' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Contracting' });
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