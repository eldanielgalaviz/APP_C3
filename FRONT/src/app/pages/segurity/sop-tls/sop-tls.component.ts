import { Component } from '@angular/core';
import { Product } from '../../../../domain/product';
import { ProductService } from '../../../../service/productservice';
import { SHARED_IMPORTS } from '../../../shared/imports';

@Component({
  selector: 'app-sop-tls',
  imports: [SHARED_IMPORTS],
    providers: [ProductService],
    standalone: true,
  templateUrl: './sop-tls.component.html',
  styleUrl: './sop-tls.component.scss'
})
export class SopTlsComponent {

visible2: boolean = false;
  products!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }
}
