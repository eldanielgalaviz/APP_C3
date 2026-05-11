import { Component } from '@angular/core';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/productservice';
import { SHARED_IMPORTS } from '../../../shared/imports';

interface state {
  name: string;
}


@Component({
  selector: 'app-ev-subacounts-tls',
  imports: [SHARED_IMPORTS],
  providers: [ProductService],
  standalone: true,
  templateUrl: './ev-subacounts-tls.component.html',
  styleUrl: './ev-subacounts-tls.component.scss'
})
export class EvSubacountsTlsComponent {

  visible2: boolean = false;
  products!: Product[];
  state: any[] | undefined;
  selectedProducts!: Product;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });

    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];
  }
}
