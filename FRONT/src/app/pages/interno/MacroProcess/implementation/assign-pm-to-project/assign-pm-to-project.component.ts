import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { PlanTeamService } from '../../../../../../service/Implementation/PlanAndTeam/PlanTeam.service';
import { PlanTeamCatalogService } from '../../../../../../service/Implementation/PlanAndTeam/catalogs/PlanTeam.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { OriginationPromoter, ProjectManagers, Smes, StatusProject } from '../../../../../interfaces/implementation/planTeam/CatalogsPlanTeam.interface';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { Subscription } from 'rxjs';
import { SmesByPlanAndTeam, SmePayload, SetPlanTeamPayload  } from '../../../../../interfaces/implementation/planTeam/PlanTeam.interface';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { CatalogsService } from '../../../../../../service/Origination/origination-catalogs.service';

@Component({
  selector: 'app-assign-pm-to-project',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  providers: [DatePipe, MessageService],
  templateUrl: './assign-pm-to-project.component.html',
  styleUrl: './assign-pm-to-project.component.scss'
})
export class AssignPMToProjectComponent implements OnInit {
  /** Se hacen las inyecciones en lugar de importar y llamar todo desde el constructor */
  private _fb = inject(FormBuilder);
  private _planTeamService = inject(PlanTeamService);
  private _planTeamCatalogService = inject(PlanTeamCatalogService);
  private _originationCatalogService = inject(CatalogsService);
  /** extras para alertas y tratamiento de fechas */
  private _messageService = inject(MessageService);
  private datePipe = inject(DatePipe);
  /** Lectura del proyecto en el que se encuentra posicionado el usuario */
  private _observableService = inject(ObservableService);
  private subscription?: Subscription;
  idProject: number = 0;
  /** Captura del token para comprobar que el usuario esta logueado */
  private _authGuardService = inject(authGuardService);
  token = this._authGuardService.getToken() || '';
  /** variables de catálogos */
  projectManagers: ProjectManagers[] = [];
  smes: Smes[] = [];
  statusProject: StatusProject[] = [];
  smeInvolved: SmesByPlanAndTeam[] = [];
  originationPromoter: OriginationPromoter[] = [];
  idPlanTeam: number = 0;
  
  /** Formulario principal del módulo */
  planTeamForm = this._fb.group({
    p_project_manager_id: ['', [Validators.required]],
    p_document_preparation_date: [null as Date | null, [Validators.required]],
    p_presentation_assembly_date: [null as Date | null, [Validators.required]],
    p_project_log_id: [''],
    p_implementation_partner_id: [''],
    p_status_project: ['', [Validators.required]],
    smes: [[] as number[], [Validators.required]],
  });

  isInvalid(field: string): boolean {
    const control = this.planTeamForm.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit(): void {
    /** primero cargamos los catálogos */
    this.getProjectManagers();
    this.getSmes();
    this.getStatusProject();
    this.getOriginationPromoter();
    /** obtenemos el id de proyecto */
    this.subscription = this._observableService.selectedProject$.subscribe(project => {
      if (project) {
        this.idProject = project.Id_projects;
        this.getPlanTeam();
      }
    });
  }

  getProjectManagers(): void {
    this._planTeamCatalogService.getProjectManagers(this.token).subscribe({
      next: (response: Respuesta) => {
        if(response.valido === 1){
          this.projectManagers = response.result;
        }
      }
    });
  }

  getSmes(): void {
    this._planTeamCatalogService.getSmes(this.token).subscribe({
      next: (response: Respuesta) => {
        if(response.valido === 1){
          this.smes = response.result;
        }
      }
    });
  }

  getStatusProject(): void {
    this._originationCatalogService.getStatusProject(this.token).subscribe({
      next: (response: Respuesta) => {
        if(response.valido === 1){
          this.statusProject = response.result;
        }
      }
   })
  }

  getOriginationPromoter(): void {
    this._originationCatalogService.getOriginationPromoter(this.token).subscribe({
      next: (response: Respuesta) => {
        if(response.valido === 1){
          this.originationPromoter = response.result;
        }
      }
    });
  }

  getPlanTeam(): void {
    /** posteriormente cargamos el web services principal para el llenado del form en caso de que ya obtuvieramos información */
    this._planTeamService.getPlanTeam(this.idProject, this.token).subscribe({
      next: (response: Respuesta) => {
        if(response.valido === 1){
          const planTeamData = response.result[0];
          if(planTeamData){
            this.planTeamForm.patchValue({
              p_project_manager_id: planTeamData.project_manager_id,
              p_document_preparation_date: planTeamData.document_preparation_date ? new Date(planTeamData.document_preparation_date) : null,
              p_presentation_assembly_date: planTeamData.presentation_assembly_date ? new Date(planTeamData.presentation_assembly_date) : null,
              p_project_log_id: planTeamData.project_log_id,
              p_implementation_partner_id: planTeamData.implementation_partner_id,
              p_status_project: planTeamData.id_status_project
            });
            this.idPlanTeam = planTeamData.id_plan_team;
            this.getSmeByPlanTeam(planTeamData.id_plan_team);
          }
        }
      }
    });
  }

  getSmeByPlanTeam(id_plan_team: number): void {
    this._planTeamService.getSmeByPlanTeam(id_plan_team, this.token).subscribe({
      next: (response: Respuesta) => {
        if(response.valido === 1){
          const smesData = response.result;
          this.smeInvolved = smesData;
          const smeIds = smesData.map((sme: SmesByPlanAndTeam) => sme.id_sme);
          this.planTeamForm.patchValue({
            smes: smeIds
          });
        }
      }
    });
  }

  save(){
    if(this.planTeamForm.invalid){
      this.planTeamForm.markAllAsTouched();
      return;
    }

    const formValue = this.planTeamForm.value;
    const currentSelection = formValue.smes || [];
    let SmeList: SmePayload[] = [];

    this.smeInvolved.forEach((existingSME) => {
      const isStillSelected = currentSelection.find((smeId: number) => smeId === existingSME.id_sme);
      if (!isStillSelected) {
        SmeList.push({
          p_id_smes_rel_plan_team: existingSME.id_smes_rel_plan_team,
          p_plan_team_id: this.idPlanTeam,
          p_id_sme: existingSME.id_sme,
          p_status: 0
        });
      }
    });

    if (currentSelection.length > 0) {
      currentSelection.forEach((smeId: number) => {
        let existingRelation = this.smeInvolved.find(x => x.id_sme === smeId);
        
        SmeList.push({
          p_id_smes_rel_plan_team: existingRelation ? existingRelation.id_smes_rel_plan_team : 0,
          p_plan_team_id: this.idPlanTeam,
          p_id_sme: smeId,
          p_status: 1
        });
      });
    }

    const data: SetPlanTeamPayload = {
      p_id_plan_team: this.idPlanTeam,
      p_projects_id: this.idProject,
      p_project_manager_id: formValue.p_project_manager_id,
      p_document_preparation_date: this.datePipe.transform(formValue.p_document_preparation_date, 'yyyy-MM-dd'),
      p_presentation_assembly_date: this.datePipe.transform(formValue.p_presentation_assembly_date, 'yyyy-MM-dd'),
      p_project_log_id: 1, //formValue.p_project_log_id,
      p_implementation_partner_id: formValue.p_implementation_partner_id,
      p_status_project: formValue.p_status_project,
      smes: SmeList
    }

    this._planTeamService.setPlanTeam(data, this.token).subscribe({
      next: (response: Respuesta) => {
        if(response.valido === 1){
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.getPlanTeam();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Plan & Team' });
        }
      }
    });
  } 
}