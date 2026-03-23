import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/imports';
import { CustomerService } from '../../../../service/customerservice';
import { Customer } from '../../../../domain/customer';
import { MenuItem } from 'primeng/api';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/productservice';

interface Column {
    field: string;
    header: string;
}


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [SHARED_IMPORTS],
  providers: [CustomerService, ProductService],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  balanceFrozen: boolean = false;
  customers!: Customer[];

  products!: Product[];
  selectedProducts!: Product;
  cols!: Column[];
  selectedColumns!: Column[];
  items!: MenuItem[];

  constructor(private customerService: CustomerService, private productService: ProductService, private cd: ChangeDetectorRef) { }

  ngOnInit() {


    setTimeout(() => {
      this.customerService.getCustomersMedium().then((data) => {
        this.customers = data;
      });
    }, 1000);

    this.productService.getProductsMini().then((data) => {
      this.products = data;
      this.cd.markForCheck();
    });

    this.cols = [
      { field: 'name', header: 'ID' },
      { field: 'category', header: 'IDCAR' },
      { field: 'quantity', header: 'Project' },
      { field: 'quantity', header: 'Aggregation' },
      { field: 'quantity', header: 'State' },
      { field: 'quantity', header: 'Municipality' },
      { field: 'quantity', header: 'Process RP' },
      { field: 'quantity', header: 'Incidences total' },
      { field: 'quantity', header: 'Project log total' },
    ];

    this.selectedColumns = this.cols;

    this.items = [
      {
        label: 'Full incidences',
        command: () => {
        }
      },
      {
        label: 'Marketing',
        command: () => {
        }
      },
      {
        label: 'General KPI',
        command: () => {
        }
      },
      {
        label: 'Full projects detall',
        command: () => {
        }
      },
    ]


  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

}
