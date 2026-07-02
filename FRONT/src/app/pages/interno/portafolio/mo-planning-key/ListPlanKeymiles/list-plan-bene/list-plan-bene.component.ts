import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA } from '../../../../../../shared/imports';

@Component({
  selector: 'app-list-plan-bene',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA],
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