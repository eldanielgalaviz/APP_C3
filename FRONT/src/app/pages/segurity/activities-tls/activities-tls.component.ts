import { Component } from '@angular/core';
import { Customer } from '../../../../domain/customer';
import { CustomerService } from '../../../../service/customerservice';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../shared/imports';

interface state {
  name: string;
}

@Component({
  selector: 'app-activities-tls',
 imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  providers: [CustomerService],
  standalone: true,
  templateUrl: './activities-tls.component.html',
  styleUrl: './activities-tls.component.scss'
})
export class ActivitiesTlsComponent {

 visible2: boolean = false;
  customers!: Customer[];
  state: any[] | undefined;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersMedium().then((data) => {
      this.customers = data;
    });

    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];
  }
}