import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface state {
  name: string;
}

@Component({
  selector: 'app-transaction-approval',
  imports: [SHARED_IMPORTS],
  templateUrl: './transaction-approval.component.html',
  styleUrl: './transaction-approval.component.scss'
})
export class TransactionApprovalComponent {

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
      // Transaction Approval
      erpaApprovalByBuyer: [null, Validators.required],
      projectApproval: [null, Validators.required], 
      erpaApprovedByProjectCounterpart: [null, Validators.required],
      percentageMktPrice: [null, Validators.required],
      projectDeveloperContractApprovedByProjectCounterpart: [null, Validators.required],
      aggregationApprovalByProjectCounterpart: [null, Validators.required],
      projectDeveloperContractApprovedByCanopia: [null, Validators.required],
    });
  }
}
