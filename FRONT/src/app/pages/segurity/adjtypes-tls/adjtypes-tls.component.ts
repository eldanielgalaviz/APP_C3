import { Component } from '@angular/core';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/productservice';
import { SHARED_IMPORTS } from '../../../shared/imports';

@Component({
  selector: 'app-adjtypes-tls',
   imports: [SHARED_IMPORTS],
   providers: [ProductService],
   standalone: true,
  templateUrl: './adjtypes-tls.component.html',
  styleUrl: './adjtypes-tls.component.scss'
})
export class AdjtypesTlsComponent {

visible2: boolean = false;
  products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }
}