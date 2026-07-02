import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA } from '../../../../../../shared/imports';

@Component({
  selector: 'app-list-plan-origin',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA],
   standalone: true,
  templateUrl: './list-plan-origin.component.html',
  styleUrl: './list-plan-origin.component.scss'
})
export class ListPlanOriginComponent {

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
      carbonFeasibilityRequested: [null, Validators.required],
      pinApproved: [null, Validators.required],
      loiSignedDate: [null, Validators.required],
      assemblyForCpApprovalDone: [null, Validators.required],
      assemblyForApprovalDone: [null, Validators.required],
      erpaContractSigned: [null, Validators.required],
      developerAggregatorContractSigned: [null, Validators.required],
      technicalDictumApproved: [null, Validators.required],
      updatedPinApproved: [null, Validators.required],
      ddPackSentToMercuria: [null, Validators.required],
      informalAssemblyToPresentProjectDone: [null, Validators.required],
      mercuriaQuestionsAnswered: [null, Validators.required],
      ddPackApprovedByMercuria: [null, Validators.required],
      kycSentToMercuria: [null, Validators.required],
      assemblyForApprovalProjectDone: [null, Validators.required],

    });
  }
}
