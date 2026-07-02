import { Component } from '@angular/core';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { Customer } from '../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../service/customerservice';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION } from '../../../../../../shared/imports';

interface Rp {
  name: string;
}


@Component({
  selector: 'app-am-table-reports',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION],
  providers: [CustomerService, MessageService, ConfirmationService],
  templateUrl: './am-table-reports.component.html',
  styleUrl: './am-table-reports.component.scss'
})
export class AmTableReportsComponent {

  items: MenuItem[] | undefined;

  customers!: Customer[];

  cities: Rp[] | undefined;
  selectedCity: Rp | undefined;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });

    this.items = [
      {
        label: 'Download KPI report',
      },
      {
        label: 'Download general KPI report',
      }

    ];

    this.cities = [
      { name: '01' },
      { name: '02' },
      { name: '03' },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warn';

      case 'renewal':

    }
    return null;
  }
}


