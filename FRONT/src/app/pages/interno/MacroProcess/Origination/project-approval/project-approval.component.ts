import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProjectApproval } from '../../../../../../service/Origination/origination-project-approval.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { projectApproval } from '../../../../../interfaces/origination/ProjectApproval/Project-Approval.interface';

@Component({
  selector: 'app-project-approval',
  imports: [SHARED_IMPORTS],
  templateUrl: './project-approval.component.html',
  providers: [MessageService]
})
export class ProjectApprovalComponent implements OnInit {

  token: any;
  form!: FormGroup;
  idProject: number = 0;
  projectApprovalData!: projectApproval;
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private _projectApprovalService: ProjectApproval,
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
      ddPackToMercuriaSubmissionDate:          [null, Validators.required],
      informalAssemblyToPresentProjectDone:    [null, Validators.required],
      mercuriaQuestionsAnswered:               [null, Validators.required],
      ddPackApprovedByMercuria:                [null, Validators.required],
    });
  }

  loadData() {
    this._projectApprovalService.getProjectApproval(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido && res.result.length > 0) {
          this.projectApprovalData = res.result[0] as projectApproval;
            this.isInsert = false;
          this.patchForm();
        } else{
          this.isInsert = true;
        }
      },
      error: (err) => console.error('Error cargando project approval:', err)
    });
  }

  patchForm() {
    const d = this.projectApprovalData;
    this.form.patchValue({
      ddPackToMercuriaSubmissionDate:       d.dd_pack_to_mercuria_submission_date ? new Date(d.dd_pack_to_mercuria_submission_date) : null,
      informalAssemblyToPresentProjectDone: d.informal_assembly_to_present_project_done_date ? new Date(d.informal_assembly_to_present_project_done_date) : null,
      mercuriaQuestionsAnswered:            d.mercuria_questions_answered_date ? new Date(d.mercuria_questions_answered_date) : null,
      ddPackApprovedByMercuria:             d.dd_pack_approved_by_mercuria_date ? new Date(d.dd_pack_approved_by_mercuria_date) : null,
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
      p_Id_project:                                       this.idProject,
      p_dd_pack_to_mercuria_submission_date:              this.formatDate(f.ddPackToMercuriaSubmissionDate),
      p_informal_assembly_to_present_project_done_date:  this.formatDate(f.informalAssemblyToPresentProjectDone),
      p_mercuria_questions_answered_date:                 this.formatDate(f.mercuriaQuestionsAnswered),
      p_dd_pack_approved_by_mercuria_date:                this.formatDate(f.ddPackApprovedByMercuria),
    };

    this._projectApprovalService.setProjectApproval(data, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadData();
        }
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Project Approval' });
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