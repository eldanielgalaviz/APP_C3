import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../../../../../domain/product';
import { ProductService } from '../../../../../../../service/productservice';

@Component({
  selector: 'cdr-estimation',
  imports: [SHARED_IMPORTS],
    providers: [ProductService],
  templateUrl: './cdr-estimation.component.html',
  styleUrl: './cdr-estimation.component.scss'
})
export class CdrEstimationComponent {


  form!: FormGroup;
  state: any[] | undefined;
  products!: Product[];

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('CDR data:', this.form.value);
  }

  ngOnInit() {

       this.productService.getProductsMini().then((data) => {
            this.products = data;
        });
        
    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];

    this.form = this.fb.group({
      // estimation Result
      ErsCalculatorResult:          [null, Validators.required],
      EstimateLeakeage:          [null, Validators.required],
      EstimatedReversalRisk:                [null, Validators.required],
      ProjectStartDate:[null, Validators.required],

    });
  }
}
