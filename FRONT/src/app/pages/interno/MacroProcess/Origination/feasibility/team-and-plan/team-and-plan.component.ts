import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface state {
  name: string;
}

@Component({
  selector: 'team-and-plan',
  imports: [SHARED_IMPORTS],
  templateUrl: './team-and-plan.component.html',
  styleUrl: './team-and-plan.component.scss'
})
export class TeamAndPlanComponent implements OnInit {

  form!: FormGroup;
  state: any[] | undefined;

  constructor(private fb: FormBuilder) {}

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  saveDocument() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Team data:', this.form.value);
  }

  ngOnInit() {
    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];

    this.form = this.fb.group({
      originationLead:      [null, Validators.required],
      originationPromoter:  [null, Validators.required],  
      smeDevelopment:       [null, Validators.required],  
      smeLegal:             [null, Validators.required],  
      smeSafeguards:        [null, Validators.required],
      smeMrv:               [null, Validators.required],
    });
  }
}