import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-plan-imple',
  imports: [SHARED_IMPORTS],
  templateUrl: './list-plan-imple.component.html',
  styleUrl: './list-plan-imple.component.scss'
})
export class ListPlanImpleComponent {

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
      projectEnlistFormatSubmitted: [null, Validators.required],
      projectListedByCar: [null, Validators.required],
      pstTrainingDone: [null, Validators.required],
      inventoryStarted: [null, Validators.required],
      inventoryFinished: [null, Validators.required],
      carbonProgramManagementPlanStarted: [null, Validators.required],
      finalAnnualProjectPlanApproved: [null, Validators.required],
      projectActivityStarted: [null, Validators.required],
      projectActivitiesFinished: [null, Validators.required],
      finalAnnualActivityFinancialReportApproved: [null, Validators.required],
      finalAnnualActivityFinancialReportCommunicatedToME: [null, Validators.required],
      finalAnnualActivityFinancialReportCommunicatedToEjidoAndSil: [null, Validators.required],
    });
  }
}