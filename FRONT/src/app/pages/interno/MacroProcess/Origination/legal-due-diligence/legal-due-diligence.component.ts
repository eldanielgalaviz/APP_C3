import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface state {
  name: string;
}


@Component({
  selector: 'app-legal-due-diligence',
  imports: [SHARED_IMPORTS],
  templateUrl: './legal-due-diligence.component.html',
  styleUrl: './legal-due-diligence.component.scss'
})
export class LegalDueDiligenceComponent {

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
      // Legal Due Diligence
      legalLead: [null, Validators.required],
      legalDueDiligenceStatus: [null, Validators.required],
      loiSignedDate: [null, Validators.required],
      kycCompleted: [null, Validators.required],
      cbRequestedToRanDate: [null, Validators.required],
      cbCompleted: [null, Validators.required],
      erpaSignedDate: [null, Validators.required],
      buyer: [null, Validators.required],
      projectAggregator: [null, Validators.required],
      projectDeveloper: [null, Validators.required],
      projectCoordinator: [null, Validators.required],
      projectCoordinatorTerm: [null, Validators.required],
      kycToMeSubmissionDate: [null, Validators.required],
      meKycStatus: [null, Validators.required],
      kyc: [null, Validators.required],
      specificConditionsPrescendent: ['', Validators.required],
      notesLegalTeam: ['', Validators.required]
    });
  }
}