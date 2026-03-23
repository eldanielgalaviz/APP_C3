import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/imports';
import { ProductService } from '../../../../service/productservice';
import { Product } from '../../../../domain/product';

@Component({
  selector: 'app-accounts-tls',
  imports: [SHARED_IMPORTS],
  providers: [ProductService],
  standalone: true,
  templateUrl: './accounts-tls.component.html',
  styleUrl: './accounts-tls.component.scss'
})
export class AccountsTlsComponent {

  visible2: boolean = false;
  products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }
}