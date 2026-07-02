import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer } from '../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../service/customerservice';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';

@Component({
  selector: 'app-pl-approved',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
   providers: [CustomerService, MessageService, ConfirmationService],
   standalone: true,
  templateUrl: './pl-approved.component.html',
  styleUrl: './pl-approved.component.scss'
})
export class PlApprovedComponent {

 customers!: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });
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
