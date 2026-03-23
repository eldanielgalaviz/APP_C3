import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-project-approval',
  imports: [SHARED_IMPORTS],
  templateUrl: './project-approval.component.html',
  styleUrl: './project-approval.component.scss'
})
export class ProjectApprovalComponent {

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

    this.form = this.fb.group({
      // Legal Due Diligence
      ddPackToMercuriaSubmissionDate: [null, Validators.required],
      informalAssemblyToPresentProjectDone: [null, Validators.required],
      mercuriaQuestionsAnswered: [null, Validators.required],
      ddPackApprovedByMercuria: [null, Validators.required],
     });
  }
}
