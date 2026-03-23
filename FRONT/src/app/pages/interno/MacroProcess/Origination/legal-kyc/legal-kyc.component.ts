import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-legal-kyc',
  imports: [SHARED_IMPORTS],
  templateUrl: './legal-kyc.component.html',
  styleUrl: './legal-kyc.component.scss'
})
export class LegalKYCComponent {

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
      // Legal KYC
      dateKycPackPrepared: [null, Validators.required],
      dateKycSentToMercuria: [null, Validators.required],
      dateKycApprovedByMercuria: [null, Validators.required],
    });
  }
}