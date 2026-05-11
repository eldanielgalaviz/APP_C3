import { Component } from '@angular/core';
import { Customer } from '../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../service/customerservice';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';

@Component({
  selector: 'by-activities',
  imports: [SHARED_IMPORTS],
  standalone: true,
  providers: [CustomerService],
  templateUrl: './by-activities.component.html',
  styleUrl: './by-activities.component.scss'
})
export class ByActivitiesComponent {


  customers!: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });
  }
}
