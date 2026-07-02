import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION } from '../../../../../shared/imports';
import { PlActivitiesComponent } from './pl-activities/pl-activities.component';
import { PlApprovedComponent } from './pl-approved/pl-approved.component';
import { PlOpensComponent } from './pl-opens/pl-opens.component';

@Component({
  selector: 'app-annual-planning',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION, PlActivitiesComponent, PlOpensComponent, PlApprovedComponent],
  templateUrl: './annual-planning.component.html',
  styleUrl: './annual-planning.component.scss'
})
export class AnnualPlanningComponent {

}
