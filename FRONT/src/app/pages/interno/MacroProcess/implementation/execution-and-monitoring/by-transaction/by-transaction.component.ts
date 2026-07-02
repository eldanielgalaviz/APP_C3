import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { Customer } from '../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../service/customerservice';

@Component({
  selector: 'by-transaction',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  standalone: true,
  providers: [CustomerService],
  templateUrl: './by-transaction.component.html',
  styleUrl: './by-transaction.component.scss'
})
export class ByTransactionComponent {

  customers!: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });
  }
}