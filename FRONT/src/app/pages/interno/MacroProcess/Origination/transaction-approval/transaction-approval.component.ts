import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { CatalogsService } from '../../../../../../service/Origination/origination-catalogs.service';
import { TransactionApproval } from '../../../../../../service/Origination/origination-transaction-approval.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { Router } from '@angular/router';
import { TransactionApprovalItem } from '../../../../../interfaces/origination/TransactionApproval/TransactionApproval.interface';

@Component({
  selector: 'app-transaction-approval',
  imports: [SHARED_IMPORTS],
  templateUrl: './transaction-approval.component.html',
  providers: [MessageService]
})
export class TransactionApprovalComponent implements OnInit {

  token: any;
  idProject: number = 0;
  form!: FormGroup;
    isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

  // Catálogos
  approvedBuyers: any[] = [];

  // Data cargada del GET
  transactionApprovalData!: TransactionApprovalItem;

  constructor(
    private fb: FormBuilder,
    private _catalogsService: CatalogsService,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private _transactionApprovalService: TransactionApproval,
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
      erpaApprovalByBuyer:                                  [null, Validators.required],
      projectApproval:                                      [null, Validators.required],
      erpaApprovedByProjectCounterpart:                     [null, Validators.required],
      approvedBuyer:                                        [null, Validators.required],
      percentageMktPrice:                                   [null, Validators.required],
      projectDeveloperContractApprovedByProjectCounterpart: [null, Validators.required],
      aggregationApprovalByProjectCounterpart:              [null, Validators.required],
      projectDeveloperContractApprovedByCanopia:            [null, Validators.required],
    });
  }

  loadCatalogsAndData() {
    forkJoin({
      approvedBuyers: this._catalogsService.getApprovedBuyer(this.token),
    }).subscribe({
      next: (res: any) => {
        this.approvedBuyers = res.approvedBuyers.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData() {
    this._transactionApprovalService.getTransactionApproval(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.transactionApprovalData = res.result[0] as TransactionApprovalItem;
          this.isInsert = false;
          this.patchForm();
        } else {
          this.isInsert = true;
        }
      },
      error: (err) => console.error('Error cargando transaction approval:', err)
    });
  }

patchForm() {
  const d: TransactionApprovalItem = this.transactionApprovalData;
  this.form.patchValue({
    erpaApprovalByBuyer:                                  d.erpa_approval_by_buyer_date ? new Date(d.erpa_approval_by_buyer_date) : null,
    projectApproval:                                      d.project_approval_date ? new Date(d.project_approval_date) : null,
    erpaApprovedByProjectCounterpart:                     d.erpa_approval_by_project_counterpart_date ? new Date(d.erpa_approval_by_project_counterpart_date) : null,
    approvedBuyer:                                        d.id_approved_buyer,
    percentageMktPrice:                                   d.percentage_mkt_price,
    projectDeveloperContractApprovedByProjectCounterpart: d.project_developer_contract_approved_by_project_counterpart ? new Date(d.project_developer_contract_approved_by_project_counterpart) : null,
    aggregationApprovalByProjectCounterpart:              d.aggregation_approval_by_project_counterpart_date ? new Date(d.aggregation_approval_by_project_counterpart_date) : null,
    projectDeveloperContractApprovedByCanopia:            d.project_developer_contract_approved_by_canopia_date ? new Date(d.project_developer_contract_approved_by_canopia_date) : null,
  });
}

  formatDate(date: any): string | null {
    if (!date) return null;
    return new Date(date).toISOString().split('T')[0];
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;

    const data = {
      p_Id_project:                              this.idProject,
      p_erpa_approval_by_buyer_date:             this.formatDate(f.erpaApprovalByBuyer),
      p_project_approval_date:                   this.formatDate(f.projectApproval),
      p_project_developer_contract_approved_by_canopia_date:  this.formatDate(f.projectDeveloperContractApprovedByCanopia),
      p_erpa_approval_by_project_counterpart_date: this.formatDate(f.erpaApprovedByProjectCounterpart),
      p_id_approved_buyer:                       f.approvedBuyer,
      p_percentage_mkt_price:                    f.percentageMktPrice,
      p_project_developer_contract_approved_by_project_counterpart:  this.formatDate(f.projectDeveloperContractApprovedByProjectCounterpart),
      p_aggregation_approval_by_project_counterpart_date:    this.formatDate(f.aggregationApprovalByProjectCounterpart),
    };

    this._transactionApprovalService.setTransactionApproval(data, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadCatalogsAndData();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Transaction Approval' });
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