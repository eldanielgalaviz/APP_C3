import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-list-plan-regis',
  imports: [SHARED_IMPORTS],
  templateUrl: './list-plan-regis.component.html',
  styleUrl: './list-plan-regis.component.scss'
})
export class ListPlanRegisComponent {


  form!: FormGroup;
  state: any[] | undefined;

  constructor(private fb: FormBuilder) {}

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  saveForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }

  ngOnInit() {
    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];

    this.form = this.fb.group({
      carProjectReviewStarted: [null, Validators.required],
      carProjectReviewFinished: [null, Validators.required],
      ejidalAssemblyToAgreeBenefits: [null, Validators.required],
      projectRegistrationFinished: [null, Validators.required],
      issuanceStarted: [null, Validators.required],
      issuanceEnded: [null, Validators.required],
    });
  }
}
