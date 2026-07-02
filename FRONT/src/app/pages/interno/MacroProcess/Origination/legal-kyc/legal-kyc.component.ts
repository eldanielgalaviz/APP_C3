import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { MessageService } from 'primeng/api';
import { LegalKyc } from '../../../../../../service/Origination/origination-legal-kyc.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { legalKyc, LegalKycPayload } from '../../../../../interfaces/origination/legal-kyc/legal-kyc.interface';
import { MekycStatus } from '../../../../../interfaces/origination/LegalDueDiligence/legal-due-diligence-catalogs.interface';
import { PermissionUser } from '../../../../../../utils/permission-user.service';
import { forkJoin } from 'rxjs';
import { CatalogsService } from '../../../../../../service/Origination/origination-catalogs.service';



@Component({
  selector: 'app-legal-kyc',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './legal-kyc.component.html',
  providers: [MessageService]
})
export class LegalKycComponent implements OnInit {

  private _fb                 = inject(FormBuilder);
  private _observableService  = inject(ObservableService);
  private _authGuardService   = inject(authGuardService);
  private _messageService     = inject(MessageService);
  private _legalKycService    = inject(LegalKyc);
  private _permissionUser     = inject(PermissionUser);
  private _catalogsService    = inject(CatalogsService);


  token: string = this._authGuardService.getToken() || '';

  /** Estado */
  idProject: number                    = 0;
  isInsert: boolean                    = true;
  isSaving: boolean                    = false;
  legalKycData!: legalKyc;
  permissions: Record<string, boolean> = {};
  mekycStatus:   MekycStatus[]   = [];
  data: legalKyc | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;

  /** Formulario */
  form = this._fb.group({
    kycCompleted:               [''],
    meKycStatus:                [null as number | null],
    dateKycPackPrepared:        [null as Date | null],
    dateKycSentToMercuria:      [null as Date | null],
    dateKycApprovalByMercuria:  [null as Date | null],


  });
  /** Archivos — DOF/RP */
  dofRpUploading: boolean = false;
  dofRpUploaded: boolean  = false;
  dofRpFile: File | null  = null;
  dofRpPath: string       = '';
  dofRpUrl: string        = '';

  /** Archivos — PHINA */
  phinaUploading: boolean   = false;
  phinaUploaded: boolean    = false;
  phinaFile: File | null    = null;
  phinaPath: string         = '';
  phinaUrl: string          = '';

  /** Archivos — Acta de elección de autoridades */
  actaEleccionUploading: boolean = false;
  actaEleccionUploaded: boolean  = false;
  actaEleccionFile: File | null  = null;
  actaEleccionPath: string       = '';
  actaEleccionUrl: string        = '';

  /** Archivos — Identificación de autoridades */
  identificacionUploading: boolean = false;
  identificacionUploaded: boolean  = false;
  identificacionFile: File | null  = null;
  identificacionPath: string       = '';
  identificacionUrl: string        = '';

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
    forkJoin({
      mekycStatus:   this._catalogsService.getMekycStatus(this.token),
    }).subscribe({
      next: (res) => {
        this.mekycStatus   = res.mekycStatus.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
      });
    }
  
  loadData(): void {
    this._legalKycService.getLegalKyc(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.legalKycData = res.result[0] as legalKyc;
          this.data = this.legalKycData;
          this.hasData = true;
          this.formChanged = false;
          this.isInsert     = false;
          this.patchForm();
        } else {
          this.isInsert = true;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error Legal KYC:', err)
    });
  }

  patchForm(): void {
    const d = this.legalKycData;
    this.form.patchValue({
      kycCompleted:              d.kyc_completed,
      meKycStatus:               d.id_mekyc_status,
      dateKycPackPrepared:       d.date_kyc_pack_prepared        ? new Date(d.date_kyc_pack_prepared)        : null,
      dateKycSentToMercuria:     d.date_kyc_sent_to_mercuria     ? new Date(d.date_kyc_sent_to_mercuria)     : null,
      dateKycApprovalByMercuria: d.date_kyc_approval_by_mercuria ? new Date(d.date_kyc_approval_by_mercuria) : null,
    }, { emitEvent: false });

    this.loadFileUrls(d);
  }

  private formatDate(date: Date | null): string | null {
    if (!date) return null;
    return new Date(date).toISOString().split('T')[0];
  }

  loadFileUrls(data: legalKyc): void {
    if (data.file_path_DOF_RP?.startsWith('proyectos')) {
      this._legalKycService.getFileWithPath(data.file_path_DOF_RP, this.token).subscribe((blob: Blob) => {
        this.dofRpUrl = URL.createObjectURL(blob);
      });
    }
    if (data.file_path_phina?.startsWith('proyectos')) {
      this._legalKycService.getFileWithPath(data.file_path_phina, this.token).subscribe((blob: Blob) => {
        this.phinaUrl = URL.createObjectURL(blob);
      });
    }
    if (data.file_path_acta_eleccion_autoridades?.startsWith('proyectos')) {
      this._legalKycService.getFileWithPath(data.file_path_acta_eleccion_autoridades, this.token).subscribe((blob: Blob) => {
        this.actaEleccionUrl = URL.createObjectURL(blob);
      });
    }
    if (data.file_path_identificacion_autoridades?.startsWith('proyectos')) {
      this._legalKycService.getFileWithPath(data.file_path_identificacion_autoridades, this.token).subscribe((blob: Blob) => {
        this.identificacionUrl = URL.createObjectURL(blob);
      });
    }
  }

  saveForm(): void {

    if (this.isSaving) return;
    this.isSaving = true;

    const f = this.form.value;

    const payload: LegalKycPayload = {
      p_Id_project:                           this.idProject,
      p_kyc_completed:                        f.kycCompleted ?? '',
      p_id_mekyc_status:                      f.meKycStatus !== null && f.meKycStatus !== undefined ? Number(f.meKycStatus) : null,
      p_date_kyc_pack_prepared:               this.formatDate(f.dateKycPackPrepared        ?? null),
      p_date_kyc_sent_to_mercuria:            this.formatDate(f.dateKycSentToMercuria      ?? null),
      p_date_kyc_approval_by_mercuria:        this.formatDate(f.dateKycApprovalByMercuria  ?? null),
      p_file_path_DOF_RP:                     this.legalKycData?.file_path_DOF_RP?.startsWith('proyectos')                        ? this.legalKycData.file_path_DOF_RP                        : null,
      p_file_path_phina:                      this.legalKycData?.file_path_phina?.startsWith('proyectos')                         ? this.legalKycData.file_path_phina                         : null,
      p_file_path_acta_eleccion_autoridades:  this.legalKycData?.file_path_acta_eleccion_autoridades?.startsWith('proyectos')     ? this.legalKycData.file_path_acta_eleccion_autoridades     : null,
      p_file_path_identificacion_autoridades: this.legalKycData?.file_path_identificacion_autoridades?.startsWith('proyectos')    ? this.legalKycData.file_path_identificacion_autoridades    : null,
    };

    const namedFiles: { key: string, file: File }[] = [];
    if (this.dofRpFile)         namedFiles.push({ key: 'file_path_DOF_RP', file: this.dofRpFile });
    if (this.phinaFile)         namedFiles.push({ key: 'file_path_phina', file: this.phinaFile });
    if (this.actaEleccionFile)  namedFiles.push({ key: 'file_path_acta_eleccion_autoridades', file: this.actaEleccionFile });
    if (this.identificacionFile) namedFiles.push({ key: 'file_path_identificacion_autoridades', file: this.identificacionFile });

    this._legalKycService.setLegalKyc(payload, namedFiles, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Legal KYC' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Legal KYC' });
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

  /** DOF/RP */
  onDofRpUpload(event: { files: File[] }): void {
    this.dofRpUploading = true;
    this.dofRpFile = event.files[0];
    setTimeout(() => {
      this.dofRpUploading = false;
      this.dofRpUrl  = URL.createObjectURL(this.dofRpFile!);
      this.dofRpPath = this.dofRpFile?.name || '';
      this.formChanged = true;
    }, 500);
  }

  onDofRpDelete(): void {
    this.dofRpFile = null; this.dofRpUploaded = false;
    this.dofRpUploading = false; this.dofRpPath = ''; this.dofRpUrl = '';
    this.formChanged = true;
  }

  /** PHINA */
  onPhinaUpload(event: { files: File[] }): void {
    this.phinaUploading = true;
    this.phinaFile = event.files[0];
    setTimeout(() => {
      this.phinaUploading = false;
      this.phinaUrl  = URL.createObjectURL(this.phinaFile!);
      this.phinaPath = this.phinaFile?.name || '';
      this.formChanged = true;
    }, 500);
  }

  onPhinaDelete(): void {
    this.phinaFile = null; this.phinaUploaded = false;
    this.phinaUploading = false; this.phinaPath = ''; this.phinaUrl = '';
    this.formChanged = true;
  }

  /** Acta de elección de autoridades */
  onActaEleccionUpload(event: { files: File[] }): void {
    this.actaEleccionUploading = true;
    this.actaEleccionFile = event.files[0];
    setTimeout(() => {
      this.actaEleccionUploading = false;
      this.actaEleccionUrl  = URL.createObjectURL(this.actaEleccionFile!);
      this.actaEleccionPath = this.actaEleccionFile?.name || '';
      this.formChanged = true;
    }, 500);
  }

  onActaEleccionDelete(): void {
    this.actaEleccionFile = null; this.actaEleccionUploaded = false;
    this.actaEleccionUploading = false; this.actaEleccionPath = ''; this.actaEleccionUrl = '';
    this.formChanged = true;
  }

  /** Identificación de autoridades */
  onIdentificacionUpload(event: { files: File[] }): void {
    this.identificacionUploading = true;
    this.identificacionFile = event.files[0];
    setTimeout(() => {
      this.identificacionUploading = false;
      this.identificacionUrl  = URL.createObjectURL(this.identificacionFile!);
      this.identificacionPath = this.identificacionFile?.name || '';
      this.formChanged = true;
    }, 500);
  }

  onIdentificacionDelete(): void {
    this.identificacionFile = null; this.identificacionUploaded = false;
    this.identificacionUploading = false; this.identificacionPath = ''; this.identificacionUrl = '';
    this.formChanged = true;
  }
}