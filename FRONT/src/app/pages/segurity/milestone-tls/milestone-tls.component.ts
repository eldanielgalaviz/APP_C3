import { Component } from '@angular/core';
import { Customer } from '../../../../domain/customer';
import { CustomerService } from '../../../../service/customerservice';
import { SHARED_IMPORTS } from '../../../shared/imports';

interface state {
  name: string;
}

@Component({
  selector: 'app-milestone-tls',
  imports: [SHARED_IMPORTS],
   providers: [CustomerService],
   standalone: true,
  templateUrl: './milestone-tls.component.html',
  styleUrl: './milestone-tls.component.scss'
})
export class MilestoneTlsComponent {

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
