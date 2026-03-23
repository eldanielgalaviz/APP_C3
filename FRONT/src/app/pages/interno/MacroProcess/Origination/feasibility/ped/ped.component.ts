import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ped',
  imports: [SHARED_IMPORTS],
  templateUrl: './ped.component.html',
  styleUrl: './ped.component.scss'
})
export class PedComponent implements OnInit {

  form!: FormGroup;
  state: any[] | undefined;
  // PED AA-Local
  pedUploading: boolean = false;
  pedUploaded: boolean = false;
  pedFile: File | null = null;  

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
    console.log('PED data:', this.form.value);
  }

  ngOnInit() {
    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];

    this.form = this.fb.group({
      // AP-Regional Result
      pedApRegionalResult:          [null, Validators.required],
      canIncludeAnpOrAdvc:          [null, Validators.required],
      canIncludePsa:                [null, Validators.required],
      requiresCommercialAgriculture:[null, Validators.required],
      requiresSubsidies:            [null, Validators.required],

      // Local PED on AA
      seccionPedAA:                 [null, Validators.required],
      poblacionAaConModelo:         [null, Validators.required],
      actividadAgropecuaria:        [null, Validators.required],
      encuestas:                    [null, Validators.required],
      subsidiosAa:                  [null, Validators.required],
      pendienteAa:                  [null, Validators.required],
      cambioCoberturaAa:            [null, Validators.required],

      // Local Feasibility on AA
      resultadoPedAaLocal:          [null, Validators.required],
      notesLocal:                   ['',   Validators.required],
    });
  }

    onPedUpload(event: any): void {
    this.pedUploading = true;
    this.pedUploaded  = false;
    this.pedFile = event.files[0];
    setTimeout(() => {
      this.pedUploading = false;
      this.pedUploaded  = true;
    }, 2000);
  }
}