import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pre-pin',
  imports: [SHARED_IMPORTS],
  templateUrl: './pre-pin.component.html',
  styleUrl: './pre-pin.component.scss'
})
export class PrePinComponent implements OnInit {

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
      // Pre-PIN Certification Program
      certificationProgram: [null, Validators.required],
      registrationRoute:    [null, Validators.required],
      methodology:          [null, Validators.required],

      // Pre-PIN Technical Assumptions
      projectArea:                    ['',   Validators.required],
      projectCondition:               [null, Validators.required],
      licencesPermits:                [null, Validators.required],
      ersCalculatorVersion:           [null, Validators.required],
      confidenceCreditingActivityArea:[null, Validators.required],
      umafor:                         [null, Validators.required],
      authorizedHarvestingVolume:     [null, Validators.required],
      licensesPermits:                [null, Validators.required],
      underlyingActivities:           ['',   Validators.required],

      // Pre-PIN MRV Assumptions
      estimatePermanence:     [null, Validators.required],
      estimateSampleSize:     [null, Validators.required],
      estimatedMrvReq:        [null, Validators.required],
      estimatedLeakage:       [null, Validators.required],
      estimatedReversalRisk:  [null, Validators.required],

      // Pre-PIN Economics Assumptions
      percentageMklPrice:       ['', Validators.required],
      confidenceUpfrontCosts:   ['', Validators.required],
      cbaCalculatorVersion:     ['', Validators.required],
      projectIrr:               ['', Validators.required],
      creditType:               ['', Validators.required],

      // Pre-PIN Safeguards Assumptions
      safeguardsNoHarm:         [null, Validators.required],
      socialCommunityOnHarm:    [null, Validators.required],
      shareholdersEngagement:   [null, Validators.required],
      pressNegative:            [null, Validators.required],
      biodiversity:             [null, Validators.required],
      humanRights:              [null, Validators.required],
      indigenousPeoples:        [null, Validators.required],
      hAndS:                    [null, Validators.required],
      negativeEhs:              [null, Validators.required],
    });
  }
}