import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION } from '../../../shared/imports';
import { ProductService } from '../../../../service/productservice';
import { Product } from '../../../../domain/product';
import { MenuItem } from 'primeng/api';
import { Customer, Representative } from '../../../../domain/customer';
import { CustomerService } from '../../../../service/customerservice';
import { Table } from 'primeng/table';

interface macro {
  name: string;
}

@Component({
  selector: 'app-dashboard-project',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION],
  providers: [ProductService, CustomerService],
  templateUrl: './dashboard-project.component.html',
  styleUrl: './dashboard-project.component.scss'
})
export class DashboardProjectComponent {

  products!: Product[];

  customers!: Customer[];
  representatives!: Representative[];
  statuses!: any[];
  loading: boolean = true;
  activityValues: number[] = [0, 100];
  searchValue: string | undefined;
   macro: any[] | undefined;

  constructor(private productService: ProductService, private customerService: CustomerService) { }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
    this.customerService.getCustomersLarge().then((customers) => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
    });


    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' }
    ];

        this.macro = [
      { name: 'Macro1' },
      { name: 'Macro2' },
      { name: 'Macro3' },
    ];

  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
  }
}
