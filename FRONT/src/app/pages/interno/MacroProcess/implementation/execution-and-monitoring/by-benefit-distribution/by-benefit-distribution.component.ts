import { Component } from '@angular/core';
import { Customer } from '../../../../../../../domain/customer';
import { CustomerService } from '../../../../../../../service/customerservice';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';

@Component({
  selector: 'by-benefit-distribution',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  standalone: true,
  providers: [CustomerService],
  templateUrl: './by-benefit-distribution.component.html',
  styleUrl: './by-benefit-distribution.component.scss'
})
export class ByBenefitDistributionComponent {

  customers!: Customer[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });
  }
}