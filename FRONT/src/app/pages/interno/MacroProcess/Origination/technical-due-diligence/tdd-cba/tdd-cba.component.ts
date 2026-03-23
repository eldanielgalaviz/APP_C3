import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { Product } from '../../../../../../../domain/product';
import { ProductService } from '../../../../../../../service/productservice';

@Component({
  selector: 'tdd-cba',
  imports: [SHARED_IMPORTS],
  standalone: true,
  providers: [ProductService],
  templateUrl: './tdd-cba.component.html',
  styleUrl: './tdd-cba.component.scss'
})
export class TddCbaComponent {

  importdoc: boolean = false;
  position!: 'bottom';
  visible: boolean = false;
  products!: Product[];
  mostrarImage: boolean = true; 
  // Document Upload
  Uploading: boolean = false;
  Uploaded: boolean = false;
  File: File | null = null;

  importDoc(position: 'bottom') {
    this.position = position;
    this.importdoc = true;
  }

  constructor(private productService: ProductService) { }


  ngOnInit() {
    this.productService.getProductsMini().then((data) => {
      this.products = data;
    });


  }
    showImage() {
    this.mostrarImage = false;
    this.importdoc = false;
  }
    onUpload(event: any): void {
    this.Uploading = true;
    this.Uploaded  = false;
    this.File = event.files[0];
    setTimeout(() => {
      this.Uploading = false;
      this.Uploaded  = true;
    }, 2000);
  }
}
