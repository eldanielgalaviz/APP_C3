import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-plan-sett',
  imports: [SHARED_IMPORTS],
  templateUrl: './list-plan-sett.component.html',
  styleUrl: './list-plan-sett.component.scss'
})
export class ListPlanSettComponent {

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
      settlementStarted: [null, Validators.required],
      paymentMadeToEjido: [null, Validators.required],
      transferOfOPEXToMandateAccountDone: [null, Validators.required],
      paymentMadeToCanopia: [null, Validators.required],
      settlementEnded: [null, Validators.required],
    });
  }
}
