import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { Customer } from '../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../service/customerservice';

@Component({
  selector: 'by-accounts',
  imports: [SHARED_IMPORTS],
  standalone: true,
  providers: [CustomerService],
  templateUrl: './by-accounts.component.html',
  styleUrl: './by-accounts.component.scss'
})
export class ByAccountsComponent {

  customers!: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });
  }
}
