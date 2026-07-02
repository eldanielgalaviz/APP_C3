import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { CatalogsService } from '../../../../../../service/Origination/origination-catalogs.service';
import { TransactionApproval } from '../../../../../../service/Origination/origination-transaction-approval.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { TransactionApprovalItem, TransactionApprovalPayload, ApprovedBuyer } from '../../../../../interfaces/origination/TransactionApproval/TransactionApproval.interface';
import { PermissionUser } from '../../../../../../utils/permission-user.service';

@Component({
  selector: 'app-transaction-approval',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './transaction-approval.component.html',
  providers: [MessageService]
})
export class TransactionApprovalComponent implements OnInit {

  private _fb                          = inject(FormBuilder);
  private _catalogsService             = inject(CatalogsService);
  private _observableService           = inject(ObservableService);
  private _authGuardService            = inject(authGuardService);
  private _messageService              = inject(MessageService);
  private _transactionApprovalService  = inject(TransactionApproval);
  private _permissionUser              = inject(PermissionUser);

  token: string = this._authGuardService.getToken() || '';

  /** Estado */
  idProject: number                        = 0;
  isInsert: boolean                        = true;
  isSaving: boolean                        = false;
  transactionApprovalData!: TransactionApprovalItem;
  permissions: Record<string, boolean>     = {};
  data: TransactionApprovalItem | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;

  /** Catálogos — ID guardado directamente en el form (optionValue) */
  approvedBuyers: ApprovedBuyer[] = [];

  /** Formulario */
  form = this._fb.group({
    erpaApprovalByBuyer:                                  [null as Date   | null],
    projectApproval:                                      [null as Date   | null],
    erpaApprovedByProjectCounterpart:                     [null as Date   | null],
    approvedBuyer:                                        [null as number | null],
    percentageMktPrice:                                   [null as number | null],
    projectDeveloperContractApprovedByProjectCounterpart: [null as Date   | null],
    aggregationApprovalByProjectCounterpart:              [null as Date   | null],
    projectDeveloperContractApprovedByCanopia:            [null as Date   | null],
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
        this.loadCatalogsAndData();
      }
    });
    this.form.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  loadCatalogsAndData(): void {
    this._catalogsService.getApprovedBuyer(this.token).subscribe({
      next: (res: Respuesta) => {
        this.approvedBuyers = res.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(): void {
    this._transactionApprovalService.getTransactionApproval(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.transactionApprovalData = res.result[0] as TransactionApprovalItem;
          this.data = this.transactionApprovalData;
          this.hasData = true;
          this.formChanged = false;
          this.isInsert                = false;
          this.patchForm();
        } else {
          this.isInsert = true;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error cargando transaction approval:', err)
    });
  }

  patchForm(): void {
    const d = this.transactionApprovalData;
    this.form.patchValue({
      erpaApprovalByBuyer:                                  d.erpa_approval_by_buyer_date                               ? new Date(d.erpa_approval_by_buyer_date)                               : null,
      projectApproval:                                      d.project_approval_date                                     ? new Date(d.project_approval_date)                                     : null,
      erpaApprovedByProjectCounterpart:                     d.erpa_approval_by_project_counterpart_date                 ? new Date(d.erpa_approval_by_project_counterpart_date)                 : null,
      approvedBuyer:                                        d.id_approved_buyer,
      percentageMktPrice:                                   d.percentage_mkt_price,
      projectDeveloperContractApprovedByProjectCounterpart: d.project_developer_contract_approved_by_project_counterpart ? new Date(d.project_developer_contract_approved_by_project_counterpart) : null,
      aggregationApprovalByProjectCounterpart:              d.aggregation_approval_by_project_counterpart_date           ? new Date(d.aggregation_approval_by_project_counterpart_date)           : null,
      projectDeveloperContractApprovedByCanopia:            d.project_developer_contract_approved_by_canopia_date        ? new Date(d.project_developer_contract_approved_by_canopia_date)        : null,
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

    const payload: TransactionApprovalPayload = {
      p_Id_project:                                                     this.idProject,
      p_erpa_approval_by_buyer_date:                                    this.formatDate(f.erpaApprovalByBuyer                                  ?? null),
      p_project_approval_date:                                          this.formatDate(f.projectApproval                                      ?? null),
      p_project_developer_contract_approved_by_canopia_date:            this.formatDate(f.projectDeveloperContractApprovedByCanopia            ?? null),
      p_erpa_approval_by_project_counterpart_date:                      this.formatDate(f.erpaApprovedByProjectCounterpart                     ?? null),
      p_id_approved_buyer:                                              f.approvedBuyer                                                        ?? null,
      p_percentage_mkt_price:                                           f.percentageMktPrice                                                   ?? null,
      p_project_developer_contract_approved_by_project_counterpart:     this.formatDate(f.projectDeveloperContractApprovedByProjectCounterpart ?? null),
      p_aggregation_approval_by_project_counterpart_date:               this.formatDate(f.aggregationApprovalByProjectCounterpart              ?? null),
    };

    this._transactionApprovalService.setTransactionApproval(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadCatalogsAndData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Transaction Approval' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Transaction Approval' });
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