import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../../shared/imports';
import { PlViewActivityComponent } from './pl-view-activity/pl-view-activity.component';
import { PlViewTotalActComponent } from './pl-view-total-act/pl-view-total-act.component';

@Component({
  selector: 'app-pl-view-plan-act-details',
  imports: [...CORE_IMPORTS, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, PlViewTotalActComponent, PlViewActivityComponent],
  templateUrl: './pl-view-plan-act-details.component.html',
  styleUrl: './pl-view-plan-act-details.component.scss'
})
export class PlViewPlanActDetailsComponent {

}
