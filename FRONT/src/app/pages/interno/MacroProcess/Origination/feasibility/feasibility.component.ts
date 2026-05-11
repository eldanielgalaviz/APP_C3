import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { ActivityAreaComponent } from './activity-area/activity-area.component';
import { CdrEstimationComponent } from './cdr-estimation/cdr-estimation.component';
import { PedComponent } from './ped/ped.component';
import { PrePinComponent } from './pre-pin/pre-pin.component';
import { ProjectAreaComponent } from './project-area/project-area.component';
import { TeamAndPlanComponent } from './team-and-plan/team-and-plan.component';
import { Router } from '@angular/router';
import { authGuardService } from '../../../../../../service/authGuard.service';

@Component({
  selector: 'app-feasibility',
  imports: [SHARED_IMPORTS,
    ActivityAreaComponent,
    CdrEstimationComponent,
    PedComponent,
    PrePinComponent,
    ProjectAreaComponent,
    TeamAndPlanComponent
  ],
  templateUrl: './feasibility.component.html',
})
export class FeasibilityComponent {

  constructor(private router: Router, private authService: authGuardService){

  }

  ngOnInit() {

  }
}
