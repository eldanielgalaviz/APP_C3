import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { MessageService } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { forkJoin, Subscription } from 'rxjs';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { ProjectArea } from '../../../../../../interfaces/origination/project-area/project-area.interface';
import { ProjectAreaPayload } from '../../../../../../interfaces/origination/project-area/project-area-payload.interface';
import { Certificacion, SolicitudRan, StatusValidacionAp } from '../../../../../../interfaces/origination/project-area/project-area-catalogs.interface';
import { PermissionUser } from '../../../../../../../utils/permission-user.service';
const RAN_APPLICATION_BLOCKING_IDS = [2, 3];
@Component({
  selector: 'project-area',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './project-area.component.html',
  providers: [MessageService]
})

export class ProjectAreaComponent implements OnInit, OnDestroy {

  private _fb                 = inject(FormBuilder);
  private _catalogsService    = inject(CatalogsService);
  private _observableService  = inject(ObservableService);
  private _authGuardService   = inject(authGuardService);
  private _messageService     = inject(MessageService);
  private _originationService = inject(Origination);
  private _permissionUser     = inject(PermissionUser);
  private ranApplicationSubscription?: Subscription;

  token: string = this._authGuardService.getToken() || '';
  

  /** Estado */
  idProject: number = 0;
  isInsert: boolean = true;
  projectArea!: ProjectArea;
  permissions: Record<string, boolean> = {};
  isSaving: boolean                    = false;
  isSecondaryBlocked: boolean = false;
  data: ProjectArea | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;


  /** Catálogos */
  certifications:  Certificacion[] = [];
  ranApplications: SolicitudRan[] = [];
  apPorSigOptions: StatusValidacionAp[] = [];

  /** Archivos — PHINA */
  phinaUploading: boolean   = false;
  phinaUploaded: boolean    = false;
  phinaFile: File | null    = null;
  phinaPath: string         = '';
  phinaUrl: string          = '';

  /** Archivos — Internal Flat */
  internalFlatUploading: boolean  = false;
  internalFlatUploaded: boolean   = false;
  internalFlatFile: File | null   = null;
  internalFlatPath: string        = '';
  internalFlatUrl: string         = '';

  /** Archivos — AP */
  apUploading: boolean  = false;
  apUploaded: boolean   = false;
  apFile: File | null   = null;
  apPath: string        = '';
  apUrl: string         = '';

  /** Formulario */
  form = this._fb.group({
    certification:         [null as Certificacion      | null, Validators.required],
    totalAreaPhina:        [null as number             | null, Validators.required],
    achurado:              [null as number             | null, Validators.required],
    expropriatedArea:      [null as number             | null, Validators.required],
    totalPerimeterAreaRan: [null as number             | null, Validators.required],
    ranApplication:        [null as SolicitudRan       | null, Validators.required],
    internalFlatSurface:   [null as number             | null, Validators.required],
    expropriatedAreas:     [null as number             | null, Validators.required],
    planYear:              [null as number             | null, Validators.required],
    apPorSig:              [null as StatusValidacionAp | null, Validators.required],
    observations:          ['',                               Validators.required],
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit(): void {
    this.loadPermissions();
    this.handleRanApplicationChanges();
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
      certifications:  this._catalogsService.getCertificacion(this.token),
      ranApplications: this._catalogsService.getSolicitudalRan(this.token),
      apPorSig:        this._catalogsService.getStatusvalidacionAp(this.token),
    }).subscribe({
      next: (res) => {
        this.certifications  = res.certifications.result;
        this.ranApplications = res.ranApplications.result;
        this.apPorSigOptions = res.apPorSig.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(): void {
    this._originationService.getspProjectAreas(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.result && res.result.length > 0) {
          const data = res.result[0] as ProjectArea;
          this.projectArea      = data;
          this.data             = data;
          this.hasData = true;
          this.formChanged = false;
          this.isInsert         = false;
          this.phinaPath        = data.file_path_phina?.startsWith('proyectos')        ? data.file_path_phina        : '';
          this.internalFlatPath = data.file_path_internal_flat?.startsWith('proyectos') ? data.file_path_internal_flat : '';
          this.apPath           = data.file_path_ap?.startsWith('proyectos')            ? data.file_path_ap            : '';
          this.form.patchValue({
            certification:         this.certifications.find(x => x.Id_certificacion === data.id_certification)    || null,
            totalAreaPhina:        data.total_area              !== null ? Number(data.total_area)              : null,
            achurado:              data.achurado                !== null ? Number(data.achurado)                : null,
            expropriatedArea:      data.expropriated_area       !== null ? Number(data.expropriated_area)       : null,
            totalPerimeterAreaRan: data.total_perimeter_area_ran !== null ? Number(data.total_perimeter_area_ran) : null,
            ranApplication:        this.ranApplications.find(x => x.Id_solicitud_ran === data.ran_application)    || null,
            internalFlatSurface:   data.internal_flat_surface   !== null ? Number(data.internal_flat_surface)   : null,
            expropriatedAreas:     data.expropriated_areas      !== null ? Number(data.expropriated_areas)      : null,
            planYear:              data.plan_yaer,
            apPorSig:              this.apPorSigOptions.find(x => x.Id_statusvalidacionap === data.id_ap_por_sig) || null,
            observations:          data.observations_ap,
          }, { emitEvent: false });
          this.loadFileUrls(data);
        } else {
          this.isInsert = false;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error cargando project area:', err)
    });
  }

  loadFileUrls(data: ProjectArea): void {
    if (data.file_path_phina?.startsWith('proyectos')) {
      this._originationService.getFileWithPath(data.file_path_phina, this.token).subscribe((blob: Blob) => {
        this.phinaUrl = URL.createObjectURL(blob);
      });
    }
    if (data.file_path_internal_flat?.startsWith('proyectos')) {
      this._originationService.getFileWithPath(data.file_path_internal_flat, this.token).subscribe((blob: Blob) => {
        this.internalFlatUrl = URL.createObjectURL(blob);
      });
    }
    if (data.file_path_ap?.startsWith('proyectos')) {
      this._originationService.getFileWithPath(data.file_path_ap, this.token).subscribe((blob: Blob) => {
        this.apUrl = URL.createObjectURL(blob);
      });
    }
  }

  saveForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;
    const f = this.form.getRawValue();

    const payload: ProjectAreaPayload = {
      p_Id_project:               this.idProject,
      p_id_certification:         f.certification?.Id_certificacion,
      p_total_area:               f.totalAreaPhina               ?? null,
      p_achurado:                 f.achurado                     ?? null,
      p_expropriated_area:        f.expropriatedArea             ?? null,
      p_file_path_phina:          this.phinaFile ? '' : this.phinaPath,
      p_total_perimeter_area_ran: f.totalPerimeterAreaRan        ?? null,
      p_ran_application:          f.ranApplication?.Id_solicitud_ran,
      p_internal_flat_surface:    f.internalFlatSurface          ?? null,
      p_expropriated_areas:       f.expropriatedAreas            ?? null,
      p_plan_yaer:                Number(f.planYear),
      p_file_path_internal_flat:  this.internalFlatFile ? '' : this.internalFlatPath,
      p_id_ap_por_sig:            Number(f.apPorSig?.Id_statusvalidacionap),
      p_file_path_ap:             this.apFile ? '' : this.apPath,
      p_observations_ap:          f.observations                 ?? '',
    };

    const namedFiles: { key: string; file: File }[] = [];
    if (this.phinaFile)        namedFiles.push({ key: 'docPhina',     file: this.phinaFile });
    if (this.internalFlatFile) namedFiles.push({ key: 'docInterFlat', file: this.internalFlatFile });
    if (this.apFile)           namedFiles.push({ key: 'DocAP',        file: this.apFile });

    this._originationService.setProjectAreas(payload, namedFiles, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.phinaFile = null; this.phinaUploaded = false; this.phinaUploading = false;
          this.internalFlatFile = null; this.internalFlatUploaded = false; this.internalFlatUploading = false;
          this.apFile = null; this.apUploaded = false; this.apUploading = false;
          this.loadCatalogsAndData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

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

  onInternalFlatUpload(event: { files: File[] }): void {
    this.internalFlatUploading = true;
    this.internalFlatFile = event.files[0];
    setTimeout(() => {
      this.internalFlatUploading = false;
      this.internalFlatUrl  = URL.createObjectURL(this.internalFlatFile!);
      this.internalFlatPath = this.internalFlatFile?.name || '';
      this.formChanged = true;
    }, 500);
  }

  onApUpload(event: { files: File[] }): void {
    this.apUploading = true;
    this.apFile = event.files[0];
    setTimeout(() => {
      this.apUploading = false;
      this.apUrl  = URL.createObjectURL(this.apFile!);
      this.apPath = this.apFile?.name || '';
      this.formChanged = true;
    }, 500);
  }

  onPhinaDelete(): void {
    this.phinaFile = null; this.phinaUploaded = false;
    this.phinaUploading = false; this.phinaPath = ''; this.phinaUrl = '';
    this.formChanged = true;
  }

  onInternalFlatDelete(): void {
    this.internalFlatFile = null; this.internalFlatUploaded = false;
    this.internalFlatUploading = false; this.internalFlatPath = ''; this.internalFlatUrl = '';
    this.formChanged = true;
  }

  onApDelete(): void {
    this.apFile = null; this.apUploaded = false;
    this.apUploading = false; this.apPath = ''; this.apUrl = '';
    this.formChanged = true;
  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-SIG'] && !permisos['EDIT-SIG']) {
          this.form.disable();
        }
      }
    });
  }

  private handleRanApplicationChanges(): void {
    this.ranApplicationSubscription = this.form.get('ranApplication')?.valueChanges.subscribe((selected: SolicitudRan | null) => {
      const shouldBlock = !!selected && RAN_APPLICATION_BLOCKING_IDS.includes(selected.Id_solicitud_ran);
      this.toggleSecondarySections(shouldBlock);
    });
  }

  private toggleSecondarySections(shouldBlock: boolean): void {
    this.isSecondaryBlocked = shouldBlock;

    const fieldsToToggle = [
      'internalFlatSurface',
      'expropriatedAreas',
      'planYear',
      'apPorSig',
      'observations'
    ];

    fieldsToToggle.forEach((fieldName: string) => {
      const control = this.form.get(fieldName);
      if (shouldBlock) {
        control?.disable({ emitEvent: false });
      } else {
        control?.enable({ emitEvent: false });
      }
    });
  }

  ngOnDestroy(): void {
    this.ranApplicationSubscription?.unsubscribe();
  }
}