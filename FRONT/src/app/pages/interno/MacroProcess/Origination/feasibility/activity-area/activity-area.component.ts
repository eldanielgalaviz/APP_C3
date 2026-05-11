import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { Router } from '@angular/router';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
import { ActivityArea } from '../../../../../../interfaces/origination/ActivityArea/ActivityArea.interface';

@Component({
  selector: 'activity-area',
  imports: [SHARED_IMPORTS],
  templateUrl: './activity-area.component.html',
  providers: [MessageService]
})
export class ActivityAreaComponent implements OnInit {

  form!: FormGroup;
  token: any;
  idProject: number = 0;
  activityArea!: ActivityArea;
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

  validationStatuses: any[] = [];
  versionsAA: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _catalogsService: CatalogsService,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private router: Router,
    private authService: authGuardService,
    private originationService: Origination
  ) {}

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit(): void {
    this.token = this._authGuardService.getToken();

    this.form = this.fb.group({
      activityArea:       ['',   Validators.required],
      validationStatusAA: [null, Validators.required],
      versionAA:          [null, Validators.required],
      notesAA:            ['',   Validators.required],
    });

    this.applyPermissions();

    this._observableService.selectedProject$.subscribe(project => {
      if (!project?.Id_projects) return;
      this.idProject = project.Id_projects;
      this.loadCatalogsAndData();
    });
  }

  applyPermissions(): void {
    this.canEdit   = this.authService.hasPermission(this.router.url, 'EDIT');
    this.canCreate = this.authService.hasPermission(this.router.url, 'CREATE');

    if (!this.canEdit && !this.canCreate) {
      this.form.disable();
    }
  }

  loadCatalogsAndData(): void {
    forkJoin({
      statuses: this._catalogsService.getStatusValidacionA(this.token),
      versions: this._catalogsService.getVersionA(this.token),
    }).subscribe({
      next: (res: { statuses: Respuesta; versions: Respuesta }) => {
        this.validationStatuses = res.statuses.result ?? [];
        this.versionsAA         = res.versions.result ?? [];
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(): void {
    this.originationService.getActivityArea(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.result && res.result.length > 0) {
          this.activityArea = res.result[0] as ActivityArea;
          this.isInsert = false;
          this.patchForm();
        } else {
          this.isInsert = true;
        }
      },
      error: (err) => console.error('Error cargando data:', err)
    });
  }

  patchForm(): void {
    this.form.patchValue({
      activityArea:       this.activityArea.activity_area,
      validationStatusAA: this.activityArea.status_validation_aa_id,
      versionAA:          this.activityArea.version_aa_id,
      notesAA:            this.activityArea.observations_aa,
    });
  }

  saveForm(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      p_id_project:              this.idProject,
      p_activity_area:           this.form.value.activityArea,
      p_status_validation_aa_id: this.form.value.validationStatusAA,
      p_version_aa_id:           this.form.value.versionAA,
      p_observations_aa:         this.form.value.notesAA,
    };

    this.originationService.setActivityArea(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Saved', detail: 'Activity Area saved successfully.' });
          this.loadCatalogsAndData();
        }
      },
      error: () => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save Activity Area.' });
      }
    });
  }
}