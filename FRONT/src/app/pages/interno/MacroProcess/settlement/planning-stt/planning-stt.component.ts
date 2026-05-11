import { Component } from '@angular/core';
import { Product } from '../../../../../../domain/product';
import { ProductService } from '../../../../../../service/productservice';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { MenuItem } from 'primeng/api';

interface state {
  name: string;
}

@Component({
  selector: 'app-planning-stt',
  imports: [SHARED_IMPORTS],
  providers: [ProductService],
  standalone: true,
  templateUrl: './planning-stt.component.html',
  styleUrl: './planning-stt.component.scss'
})
export class PlanningSttComponent {

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  products!: Product[];
  selectedValue: any;
  state: any[] | undefined;

  items: MenuItem[] | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });

    this.state = [
      { name: '1' },
      { name: '2' },
      { name: '3' },
      { name: '4' },
    ];

    this.items = [
      {
            label: 'Download settlement planning',
      },
    ];
  }
}