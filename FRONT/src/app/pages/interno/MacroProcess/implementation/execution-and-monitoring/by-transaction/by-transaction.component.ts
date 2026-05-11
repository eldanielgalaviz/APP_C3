import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { Customer } from '../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../service/customerservice';

@Component({
  selector: 'by-transaction',
  imports: [SHARED_IMPORTS],
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