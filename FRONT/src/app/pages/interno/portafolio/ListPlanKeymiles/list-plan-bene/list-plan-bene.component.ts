import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-plan-bene',
  imports: [SHARED_IMPORTS],
  templateUrl: './list-plan-bene.component.html',
  styleUrl: './list-plan-bene.component.scss'
})
export class ListPlanBeneComponent {

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
      settlementAssemblyAndBenefitDistributionFollowUp: [null, Validators.required],
      benefitDistributionEndedOfRp: [null, Validators.required],
    });
  }
}