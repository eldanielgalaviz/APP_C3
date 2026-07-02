// plan-team.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { AssignPMToProjectComponent } from './assign-pm-to-project.component';
import { PlanTeamService } from '../../../../../../service/Implementation/PlanAndTeam/PlanTeam.service';

describe('PlanTeamComponent', () => {

  let component: AssignPMToProjectComponent;
  let fixture: ComponentFixture<AssignPMToProjectComponent>;

  let planTeamServiceSpy: jasmine.SpyObj<PlanTeamService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {

    const serviceSpy = jasmine.createSpyObj('PlanTeamService', [
      'setPlanTeam'
    ]);

    const msgSpy = jasmine.createSpyObj('MessageService', [
      'add'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        AssignPMToProjectComponent
      ],
      providers: [
        FormBuilder,
        DatePipe,
        {
          provide: PlanTeamService,
          useValue: serviceSpy
        },
        {
          provide: MessageService,
          useValue: msgSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignPMToProjectComponent);

    component = fixture.componentInstance;

    planTeamServiceSpy = TestBed.inject(
      PlanTeamService
    ) as jasmine.SpyObj<PlanTeamService>;

    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;

    component.planTeamForm = new FormBuilder().group({
      p_project_log_id: ['1'],
      p_project_manager_id: ['1'],
      p_document_preparation_date: [new Date()],
      p_presentation_assembly_date: [new Date()],
      p_implementation_partner_id: ['2'],
      p_status_project: ['1'],
      smes: [[1, 2]]
    });

    component.idPlanTeam = 10;
    component.idProject = 20;
    component.token = 'TOKEN_TEST';

    component.smeInvolved = [
      {
        id_smes_rel_plan_team: 100,
        id_sme: 1,
        plan_team_id: 10,
        date_created: new Date()
      },
      {
        id_smes_rel_plan_team: 101,
        id_sme: 3,
        plan_team_id: 10,
        date_created: new Date()
      }
    ];

    fixture.detectChanges();

  });

  it('debe ejecutar save correctamente', () => {

    const mockResponse = {
      valido: 1
    };

    planTeamServiceSpy.setPlanTeam.and.returnValue(
      of(mockResponse as any)
    );

    spyOn(component, 'getPlanTeam');

    component.save();

    expect(planTeamServiceSpy.setPlanTeam).toHaveBeenCalled();

    const requestBody =
      planTeamServiceSpy.setPlanTeam.calls.mostRecent().args[0];

    expect(requestBody.p_id_plan_team).toBe(10);

    expect(requestBody.p_projects_id).toBe(20);

    expect(requestBody.smes.length).toBe(3);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Saved successfully'
    });

    expect(component.getPlanTeam).toHaveBeenCalled();

  });

  it('no debe guardar si el formulario es inválido', () => {

    component.planTeamForm.get(
      'p_project_manager_id'
    )?.setValue(null);

    component.planTeamForm.setErrors({
      invalid: true
    });

    component.save();

    expect(
      planTeamServiceSpy.setPlanTeam
    ).not.toHaveBeenCalled();

  });

  it('debe mostrar mensaje error cuando API falle', () => {

    const mockResponse = {
      valido: 0
    };

    planTeamServiceSpy.setPlanTeam.and.returnValue(
      of(mockResponse as any)
    );

    component.save();

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to save Plan & Team'
    });

  });

  it('debe construir correctamente la lista de SMEs', () => {

    const mockResponse = {
      valido: 1
    };

    planTeamServiceSpy.setPlanTeam.and.returnValue(
      of(mockResponse as any)
    );

    component.save();

    const requestBody =
      planTeamServiceSpy.setPlanTeam.calls.mostRecent().args[0];

    const inactiveSME = requestBody.smes.find(
      (x: any) => x.p_id_sme === 3
    );

    expect(inactiveSME.p_status).toBe(0);

    const activeSME = requestBody.smes.find(
      (x: any) => x.p_id_sme === 1
    );

    expect(activeSME.p_status).toBe(1);

  });

});