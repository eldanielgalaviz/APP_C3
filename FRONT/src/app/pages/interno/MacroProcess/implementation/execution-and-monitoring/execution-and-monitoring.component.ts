import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { ByAccountsComponent } from './by-accounts/by-accounts.component';
import { ByActivitiesComponent } from './by-activities/by-activities.component';
import { ByBenefitDistributionComponent } from './by-benefit-distribution/by-benefit-distribution.component';
import { ByTransactionComponent } from './by-transaction/by-transaction.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-execution-and-monitoring',
  imports: [SHARED_IMPORTS, ByAccountsComponent, ByActivitiesComponent, ByBenefitDistributionComponent, ByTransactionComponent],
  templateUrl: './execution-and-monitoring.component.html',
  styleUrl: './execution-and-monitoring.component.scss'
})
export class ExecutionAndMonitoringComponent {

  value!: number;

  items: MenuItem[] | undefined;

  paymentOptions: any[] = [
    { name: 'RP 1', value: 1 },
    { name: 'RP 2', value: 2 },
    { name: 'RP 3', value: 3 },
    { name: 'RP 4', value: 4 },
    { name: 'RP 5', value: 5 },
    { name: 'RP 6', value: 6 },
    { name: 'RP 7', value: 7 },
    { name: 'RP 8', value: 8 },
    { name: 'RP 9', value: 9 },
    { name: 'RP 10', value: 10 },
  ];

  ngOnInit() {
    this.items = [
      {
        label: 'View global financial',
        items: [
          {
            label: 'Download full financial report',
          },
        ]
      },
      {
        label: 'View by accounts',
        items: [
          {
            label: 'Download by accounts',
          },
          {
            label: 'Download provisional leader MXN',
          },
        ]
      },
      {
          label: 'View by activities',
          items: [
            {
              label: 'Download by activities',
            },
            {
              label: 'Download provisional leader MXN',
            },
          ]
        },
        {
          label: 'View by benefit distribution',
          items: [
            {
              label: 'Download by benefit distribution',
            },
          ]
      },
      {
         label: 'View by transaction',
        items:[
                {
              label: 'Download by transaction',
            },
              {
            label: 'Download general by transaction',
          },
        ]
      }
    ];
  }

}
