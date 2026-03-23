import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { Product } from '../../../../../../../domain/product';
import { ProductService } from '../../../../../../../service/productservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tdd-document',
  imports: [SHARED_IMPORTS],
  standalone: true,
  providers: [ProductService],
  templateUrl: './tdd-document.component.html',
  styleUrl: './tdd-document.component.scss'
})
export class TddDocumentComponent implements OnInit {

  form!: FormGroup;
  state: any[] | undefined;
  products!: Product[];
  // Document Upload
  Uploading: boolean = false;
  Uploaded: boolean = false;
  File: File | null = null;

  constructor(private productService: ProductService, private fb: FormBuilder) {}

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  saveDocument() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':  return 'success';
      case 'LOWSTOCK': return 'warn';
      case 'OUTOFSTOCK': return 'danger';
    }
    return undefined;
  }

  ngOnInit() {
    this.productService.getProducts().then(data => this.products = data);

    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];

    this.form = this.fb.group({
      milestone:    [null, Validators.required],
      generateDate: [null, Validators.required],
      status:       [null, Validators.required],
    });
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