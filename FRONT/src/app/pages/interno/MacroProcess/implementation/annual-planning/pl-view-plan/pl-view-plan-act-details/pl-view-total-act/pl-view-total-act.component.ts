import { ChangeDetectorRef, Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_DATA, PRIMENG_FORM, PRIMENG_OVERLAY } from '../../../../../../../../shared/imports';
import { ProductService } from '../../../../../../../../../service/productservice';
import { Product } from '../../../../../../../../../domain/product';

@Component({
  selector: 'app-pl-view-total-act',
   standalone: true,
  imports: [...CORE_IMPORTS, ...PRIMENG_DATA, ...PRIMENG_FORM, ...PRIMENG_OVERLAY],
   providers: [ProductService],
  templateUrl: './pl-view-total-act.component.html',
  styleUrl: './pl-view-total-act.component.scss'
})
export class PlViewTotalActComponent {
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
  
  sourceProducts!: Product[];

  targetProducts!: Product[];

  constructor(
    private carService: ProductService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.carService.getProductsSmall().then(products => {
      this.sourceProducts = products;
      this.cdr.markForCheck();
    });
    this.targetProducts = [];
  }
}