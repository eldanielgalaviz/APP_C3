import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'activity-area',
  imports: [SHARED_IMPORTS],
  templateUrl: './activity-area.component.html',
  styleUrl: './activity-area.component.scss'
})
export class ActivityAreaComponent implements OnInit {

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
    console.log('Activity Area data:', this.form.value);
  }

  ngOnInit() {
    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];

    this.form = this.fb.group({
      activityArea:       ['',   Validators.required],
      validationStatusAA: [null, Validators.required],
      versionAA:          [null, Validators.required],
      notesAA:            ['',   Validators.required],
    });
  }
}