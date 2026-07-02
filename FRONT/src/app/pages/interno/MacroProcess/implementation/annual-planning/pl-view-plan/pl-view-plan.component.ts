import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION } from '../../../../../../shared/imports';
import { PlViewPlanCronogramaComponent } from './pl-view-plan-cronograma/pl-view-plan-cronograma.component';
import { PlViewPlanActDetailsComponent } from './pl-view-plan-act-details/pl-view-plan-act-details.component';
import { MenuItem } from 'primeng/api';
import { CustomerService } from '../../../../../../../service/customerservice';

interface City {
  name: string;
}
interface Status {
  name: string;
  styleClass: string;
}

@Component({
  selector: 'app-pl-view-plan',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION, PlViewPlanCronogramaComponent, PlViewPlanActDetailsComponent],
  providers: [CustomerService],
  standalone: true,
  templateUrl: './pl-view-plan.component.html',
  styleUrl: './pl-view-plan.component.scss'
})
export class PlViewPlanComponent {

  value!: number;

  items: MenuItem[] | undefined;

  cities: City[] | undefined;
  status: Status[] | undefined;

  ngOnInit() {

    this.cities = [
      { name: 'RP1' },
      { name: 'RP2' },
      { name: 'RP3' },
    ];

    this.status = [
      {
        name: 'Pending',
        styleClass: 'pending'
      },
      {
        name: 'Correction',
        styleClass: 'correction'
      },
      {
        name: 'Evaluation',
        styleClass: 'evaluation'
      },
      {
        name: 'Approved',
        styleClass: 'approved'
      },
      {
        name: 'Canceled',
        styleClass: 'cancel'
      },
      {
        name: 'Approved by assembly',
        styleClass: 'approved-asam'
      }
    ];

    this.items = [
      {
        label: 'Download annual plan Excel',
      },
      {
        label: 'Download annual plan Word',
      },


    ];
  }

}
