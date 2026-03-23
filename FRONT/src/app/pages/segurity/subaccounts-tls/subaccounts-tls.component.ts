import { Component } from '@angular/core';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/productservice';
import { SHARED_IMPORTS } from '../../../shared/imports';
import { Customer } from '../../../../domain/customer';
import { CustomerService } from '../../../../service/customerservice';

interface state {
  name: string;
}

@Component({
  selector: 'app-subaccounts-tls',
   imports: [SHARED_IMPORTS],
     providers: [CustomerService],
   standalone: true,
  templateUrl: './subaccounts-tls.component.html',
  styleUrl: './subaccounts-tls.component.scss'
})
export class SubaccountsTlsComponent {

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