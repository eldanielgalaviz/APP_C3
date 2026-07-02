import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION } from '../../../shared/imports';
import { ProductService } from '../../../../service/productservice';
import { Product } from '../../../../domain/product';

@Component({
  selector: 'app-accounts-tls',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION],
  providers: [ProductService],
  standalone: true,
  templateUrl: './accounts-tls.component.html',
  styleUrl: './accounts-tls.component.scss'
})
export class AccountsTlsComponent {

  visible2: boolean = false;
  products!: Product[];
  selectedValue: any;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });
  }
}