import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { MessageService } from 'primeng/api';
import { LegalKyc } from '../../../../../../service/Origination/origination-legal-kyc.service';
import { Router } from '@angular/router';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { legalKyc } from '../../../../../interfaces/origination/legal-kyc/legal-kyc.interface';

@Component({
  selector: 'app-legal-kyc',
  imports: [SHARED_IMPORTS],
  templateUrl: './legal-kyc.component.html',
  providers: [MessageService]
})
export class LegalKycComponent implements OnInit {

  token: any;
  form!: FormGroup;
  legalKycData: any = null;
  idProject: number = 0;
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private _legalKycService: LegalKyc,
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
      dateKycPackPrepared:         [null, Validators.required],
      dateKycSentToMercuria:      [null, Validators.required],
      dateKycApprovalByMercuria:  [null, Validators.required],
    });
  }

  loadData() {
    this._legalKycService.getLegalKyc(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.legalKycData = res.result[0] as legalKyc;
            this.isInsert = false;
          this.patchForm();
        } else {
          this.isInsert = true;
        }
      },
      error: (err) => console.error('Error Legal KYC:', err)
    });
  }

  patchForm() {
      const d: legalKyc = this.legalKycData;
    this.form.patchValue({
      dateKycPackPrepared:        d.date_kyc_pack_prepared        ? new Date(d.date_kyc_pack_prepared)        : null,
      dateKycSentToMercuria:      d.date_kyc_sent_to_mercuria     ? new Date(d.date_kyc_sent_to_mercuria)     : null,
      dateKycApprovalByMercuria:  d.date_kyc_approval_by_mercuria ? new Date(d.date_kyc_approval_by_mercuria) : null
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
      p_Id_project:                       this.idProject,
      p_date_kyc_pack_prepared:         this.formatDate(f.dateKycPackPrepared),
      p_date_kyc_sent_to_mercuria:      this.formatDate(f.dateKycSentToMercuria),
      p_date_kyc_approval_by_mercuria:  this.formatDate(f.dateKycApprovalByMercuria)
    };

    this._legalKycService.setLegalKyc(data, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadData();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Legal KYC' });
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