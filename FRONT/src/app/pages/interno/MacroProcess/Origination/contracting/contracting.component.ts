import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { Router } from '@angular/router';
import { Contracting } from '../../../../../../service/Origination/origination-contrating.service';

@Component({
  selector: 'app-contracting',
  imports: [SHARED_IMPORTS],
  templateUrl: './contracting.component.html',
  providers: [MessageService]
})
export class ContractingComponent implements OnInit {

  form!: FormGroup;
  idProject: number = 0;
  token: any;
  contratingData: any = null;

  constructor(
    private fb: FormBuilder,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private _contracting: Contracting,
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
        this.loadData();
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      erpaSignedByBuyer:                                        [null, Validators.required],
      erpaSignedByProjectCounterpart:                           [null, Validators.required],
      projectDeveloperContractSignedByProjectCounterpart:       [null, Validators.required],
      aggregationApprovalSignedByProjectCounterpart:            [null, Validators.required],
      authorityDesignationFormatSigned:                         [null, Validators.required],
      termsOfUseSignedByProjectCounterpart:                     [null, Validators.required],
      projectDeveloperContractSignedByCanopia:                  [null, Validators.required],
    });
  }

  loadData() {
    this._contracting.getContrating(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.contratingData = res.result[0];
          this.patchForm();
        }
      },
      error: (err) => console.error('Error cargando contracting:', err)
    });
  }

  patchForm() {
    const d = this.contratingData;
    this.form.patchValue({
      erpaSignedByBuyer:                                        d.erpa_signed_by_buyer ? new Date(d.erpa_signed_by_buyer) : null,
      erpaSignedByProjectCounterpart:                           d.erpa_signed_by_project_counterpart ? new Date(d.erpa_signed_by_project_counterpart) : null,
      projectDeveloperContractSignedByProjectCounterpart:       d.project_developer_contract_signed_by_project_counterpart ? new Date(d.project_developer_contract_signed_by_project_counterpart) : null,
      aggregationApprovalSignedByProjectCounterpart:            d.aggregation_approval_signed_by_project_counterpart ? new Date(d.aggregation_approval_signed_by_project_counterpart) : null,
      authorityDesignationFormatSigned:                         d.authority_designation_format_signed ? new Date(d.authority_designation_format_signed) : null,
      termsOfUseSignedByProjectCounterpart:                     d.terms_of_use_signed_project_counterpart ? new Date(d.terms_of_use_signed_project_counterpart) : null,
      projectDeveloperContractSignedByCanopia:                  d.project_developer_contract_signed_by_canopia ? new Date(d.project_developer_contract_signed_by_canopia) : null,
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
      p_Id_project:                                                    this.idProject,
      p_erpa_signed_by_buyer:                                          this.formatDate(f.erpaSignedByBuyer),
      p_erpa_signed_by_project_counterpart:                            this.formatDate(f.erpaSignedByProjectCounterpart),
      p_project_developer_contract_signed_by_project_counterpart:      this.formatDate(f.projectDeveloperContractSignedByProjectCounterpart),
      p_aggregation_approval_signed_by_project_counterpart:            this.formatDate(f.aggregationApprovalSignedByProjectCounterpart),
      p_authority_designation_format_signed:                           this.formatDate(f.authorityDesignationFormatSigned),
      p_terms_of_use_signed_project_counterpart:                       this.formatDate(f.termsOfUseSignedByProjectCounterpart),
      p_project_developer_contract_signed_by_canopia:                  this.formatDate(f.projectDeveloperContractSignedByCanopia),
    };

    this._contracting.setContrating(data, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadData();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Contracting' });
        console.error('Error saving:', err);
      }
    });
  }

  applyPermissions(): void {
    const canEdit = this.authService.hasPermission(this.router.url, 'EDIT');
    const canCreate = this.authService.hasPermission(this.router.url, 'CREATE');
    if (!canEdit && !canCreate) {
      this.form.disable();
    }
  }
}