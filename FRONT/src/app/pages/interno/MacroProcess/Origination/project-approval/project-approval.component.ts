import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { MessageService } from 'primeng/api';
import { ProjectApproval } from '../../../../../../service/Origination/origination-project-approval.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { projectApproval, ProjectApprovalPayload } from '../../../../../interfaces/origination/ProjectApproval/Project-Approval.interface';
import { PermissionUser } from '../../../../../../utils/permission-user.service';

@Component({
  selector: 'app-project-approval',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './project-approval.component.html',
  providers: [MessageService]
})
export class ProjectApprovalComponent implements OnInit {

  private _fb                     = inject(FormBuilder);
  private _observableService      = inject(ObservableService);
  private _authGuardService       = inject(authGuardService);
  private _messageService         = inject(MessageService);
  private _projectApprovalService = inject(ProjectApproval);
  private _permissionUser         = inject(PermissionUser);

  token: string = this._authGuardService.getToken() || '';

  /** Estado */
  idProject: number                    = 0;
  isInsert: boolean                    = true;
  isSaving: boolean                    = false;
  projectApprovalData!: projectApproval;
  permissions: Record<string, boolean> = {};
  data: projectApproval | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;

  /** Formulario */
  form = this._fb.group({
    ddPackToMercuriaSubmissionDate:         [null as Date | null],
    informalAssemblyToPresentProjectDone:   [null as Date | null],
    mercuriaQuestionsAnswered:              [null as Date | null],
    ddPackApprovedByMercuria:               [null as Date | null],
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
    this._projectApprovalService.getProjectApproval(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.projectApprovalData = res.result[0] as projectApproval;
          this.data = this.projectApprovalData;
          this.hasData = true;
          this.formChanged = false;
          this.isInsert            = false;
          this.patchForm();
        } else {
          this.isInsert = true;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error cargando project approval:', err)
    });
  }

  patchForm(): void {
    const d = this.projectApprovalData;
    this.form.patchValue({
      ddPackToMercuriaSubmissionDate:       d.dd_pack_to_mercuria_submission_date              ? new Date(d.dd_pack_to_mercuria_submission_date)              : null,
      informalAssemblyToPresentProjectDone: d.informal_assembly_to_present_project_done_date   ? new Date(d.informal_assembly_to_present_project_done_date)   : null,
      mercuriaQuestionsAnswered:            d.mercuria_questions_answered_date                 ? new Date(d.mercuria_questions_answered_date)                 : null,
      ddPackApprovedByMercuria:             d.dd_pack_approved_by_mercuria_date                ? new Date(d.dd_pack_approved_by_mercuria_date)                : null,
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

    const payload: ProjectApprovalPayload = {
      p_Id_project:                                      this.idProject,
      p_dd_pack_to_mercuria_submission_date:             this.formatDate(f.ddPackToMercuriaSubmissionDate             ?? null),
      p_informal_assembly_to_present_project_done_date:  this.formatDate(f.informalAssemblyToPresentProjectDone      ?? null),
      p_mercuria_questions_answered_date:                this.formatDate(f.mercuriaQuestionsAnswered                  ?? null),
      p_dd_pack_approved_by_mercuria_date:               this.formatDate(f.ddPackApprovedByMercuria                   ?? null),
    };

    this._projectApprovalService.setProjectApproval(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Project Approval' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Project Approval' });
      }
    });
  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-ORIGINATION'] && !permisos['EDIT-ORIGINATION']) {
          this.form.disable();
        }
      }
    });
  }
}