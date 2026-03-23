import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface state {
  name: string;
}

@Component({
  selector: 'project-area',
  imports: [SHARED_IMPORTS],
  templateUrl: './project-area.component.html',
  styleUrl: './project-area.component.scss',
  providers: [MessageService]
})
export class ProjectAreaComponent {

  form!: FormGroup;
  state: any[] | undefined;
  // PHINA
  phinaUploading = false;
  phinaUploaded  = false;
  phinaFile: File | null = null;

  // Internal Flat
  internalFlatUploading = false;
  internalFlatUploaded  = false;
  internalFlatFile: File | null = null;

  // AP
  apUploading = false;
  apUploaded  = false;
  apFile: File | null = null;

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
      certification: [null, Validators.required],
      totalAreaPhina:    [null, Validators.required],
      achurado:          [null, Validators.required],
      expropriatedArea:  [null, Validators.required],
      planYear:          [null, Validators.required],
      apPorSig:          [null, Validators.required],
      observations:       ['',   Validators.required],
      totalPerimeterAreaRan: [null, Validators.required],
      ranApplication:    [null, Validators.required],
      internalFlatSurface:[null, Validators.required],
      expropriatedAreas: [null, Validators.required],
    });
  }


  onPhinaUpload(event: any): void {
    this.phinaUploading = true;
    this.phinaUploaded  = false;
    this.phinaFile = event.files[0];
    setTimeout(() => {
      this.phinaUploading = false;
      this.phinaUploaded  = true;
    }, 2000);
  }
  onInternalFlatUpload(event: any): void {
    this.internalFlatUploading = true;
    this.internalFlatUploaded  = false;
    this.internalFlatFile = event.files[0];
    setTimeout(() => {
      this.internalFlatUploading = false;
      this.internalFlatUploaded  = true;
    }, 2000);
  }

  onApUpload(event: any): void {
    this.apUploading = true;
    this.apUploaded  = false;
    this.apFile = event.files[0];
    setTimeout(() => {
      this.apUploading = false;
      this.apUploaded  = true;
    }, 2000);
  }
}