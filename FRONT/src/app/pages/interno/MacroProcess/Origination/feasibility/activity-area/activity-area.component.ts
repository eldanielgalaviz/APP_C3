import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { ActivityArea } from '../../../../../../interfaces/origination/ActivityArea/ActivityArea.interface';
import { ActivityAreaPayload } from '../../../../../../interfaces/origination/ActivityArea/activity-area-payload.interface';
import { StatusValidationAA, VersionAA } from '../../../../../../interfaces/origination/ActivityArea/activity-area-catalogs.interface';
import { PermissionUser } from '../../../../../../../utils/permission-user.service';

@Component({
  selector: 'activity-area',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './activity-area.component.html',
  providers: [MessageService]
})
export class ActivityAreaComponent implements OnInit {

  private _fb                 = inject(FormBuilder);
  private _catalogsService    = inject(CatalogsService);
  private _observableService  = inject(ObservableService);
  private _authGuardService   = inject(authGuardService);
  private _messageService     = inject(MessageService);
  private _originationService = inject(Origination);
  private _permissionUser     = inject(PermissionUser);

  token: string = this._authGuardService.getToken() || '';

  /** Estado */
  idProject: number                    = 0;
  isInsert: boolean                    = true;
  activityArea!: ActivityArea;
  permissions: Record<string, boolean> = {};
  data: ActivityArea | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;

  /** Catálogos */
  validationStatuses: StatusValidationAA[] = [];
  versionsAA:         VersionAA[]          = [];

  /** Formulario — validationStatusAA y versionAA guardan el ID directamente (optionValue) */
  form = this._fb.group({
    activityArea:       ['',              Validators.required],
    validationStatusAA: [null as number | null, Validators.required],
    versionAA:          [null as number | null, Validators.required],
    notesAA:            ['',              Validators.required],
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit(): void {
    this.loadPermissions();
    this._observableService.selectedProject$.subscribe(project => {
      if (!project?.Id_projects) return;
      this.idProject = project.Id_projects;
      this.loadCatalogsAndData();
    });
      this.form.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  loadCatalogsAndData(): void {
    forkJoin({
      statuses: this._catalogsService.getStatusValidacionA(this.token),
      versions: this._catalogsService.getVersionA(this.token),
    }).subscribe({
      next: (res) => {
        this.validationStatuses = res.statuses.result ?? [];
        this.versionsAA         = res.versions.result ?? [];
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(): void {
    this._originationService.getActivityArea(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.result && res.result.length > 0) {
          this.activityArea = res.result[0] as ActivityArea;
          this.data = this.activityArea;
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
      error: (err) => console.error('Error cargando activity area:', err)
    });
  }

  patchForm(): void {
    this.form.patchValue({
      activityArea:       this.activityArea.activity_area,
      validationStatusAA: this.activityArea.status_validation_aa_id,
      versionAA:          this.activityArea.version_aa_id,
      notesAA:            this.activityArea.observations_aa,
    }, { emitEvent: false });
  }

  saveForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;

    const payload: ActivityAreaPayload = {
      p_id_project:              this.idProject,
      p_activity_area:           f.activityArea           ?? '',
      p_status_validation_aa_id: f.validationStatusAA     ?? null,
      p_version_aa_id:           f.versionAA              ?? null,
      p_observations_aa:         f.notesAA                ?? '',
    };

    this._originationService.setActivityArea(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Saved', detail: 'Activity Area saved successfully.' });
          this.loadCatalogsAndData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Activity Area.' });
        }
      },
      error: () => this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Activity Area.' })
    });
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
}