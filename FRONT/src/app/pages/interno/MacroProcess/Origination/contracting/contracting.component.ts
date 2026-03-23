import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface state {
  name: string;
}

@Component({
  selector: 'app-contracting',
  imports: [SHARED_IMPORTS],
  templateUrl: './contracting.component.html',
  styleUrl: './contracting.component.scss'
})
export class ContractingComponent {

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
    erpaSignedByBuyer: [null, Validators.required],
    projectDeveloperContractSignedByProjectCounterpart: [null, Validators.required],
    aggregationApprovalSignedByProjectCounterpart: [null, Validators.required],
    authorityDesignationFormatSigned: [null, Validators.required],
    termsOfUseSignedByProjectCounterpart: [null, Validators.required],
    projectDeveloperContractSignedByCanopia: [null, Validators.required],

    });
  }
}