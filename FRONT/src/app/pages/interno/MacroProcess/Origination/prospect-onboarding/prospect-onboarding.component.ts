import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regex, onlyNumbersKey } from '../../../../../../utils/regex';

interface state {
  name: string;
}

@Component({
  selector: 'app-prospect-onboarding',
  imports: [SHARED_IMPORTS],
  templateUrl: './prospect-onboarding.component.html',
  styleUrl: './prospect-onboarding.component.scss'
})
export class ProspectOnboardingComponent implements OnInit {

  form!: FormGroup;
  state: any[] | undefined;
  projectalive: boolean = false;
  position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'bottom';
  visible: boolean = false;
  selectedNucleo: string = '';
  mostrarBoton: boolean = false;
  onlyNumbers = onlyNumbersKey;

  constructor(private fb: FormBuilder) {}

  projectAlive(position: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright') {
      this.position = position;
      this.projectalive = true;
  }

  showDialog() {
    this.visible = true;
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  saveProject() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.mostrarBoton = true;
  }

  ngOnInit() {
    this.state = [
      { name: 'Mileston1' },
      { name: 'Mileston2' },
      { name: 'Mileston3' },
    ];

    this.form = this.fb.group({
      // Land Onboarding
      landState:        [null, Validators.required],
      municipality:     [null, Validators.required],
      nucleoAgrario:    ['',   Validators.required],
      nucleoAgrarioVal: [null],
      landTenureType:   [null, Validators.required],
      linkPolygon:      ['',   Validators.required],

      // Prospect Onboarding
      projectCounterpart:       ['', Validators.required],
      prospectContactName:      ['', Validators.required],
      prospectContactRole:      ['', Validators.required],
      prospectContactTelephone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      prospectContactEmail:     ['', [Validators.required, Validators.email]],

      // Prospect Contact Address
      zipCode:        ['',  [Validators.required, Validators.pattern(/^\d{5}$/)]],
      addressState:   [null, Validators.required],
      addressMunicip: [null, Validators.required],
      colony:         [null, Validators.required],
      street:         ['',   Validators.required],
      exteriorNumber: ['',   Validators.required],
      interiorNumber: [''],

      // Project Onboarding
      projectName:  ['',   Validators.required],
      projectType:  [null, Validators.required],
      program:      [null, Validators.required],
      priority:     [null, Validators.required],
      description:  ['',   Validators.required],
    });

    // nucleoAgrarioVal requerido solo si nucleoAgrario === 'yes'
    this.form.get('nucleoAgrario')?.valueChanges.subscribe(value => {
      const control = this.form.get('nucleoAgrarioVal');
      if (value === 'yes') {
        control?.setValidators(Validators.required);
      } else {
        control?.clearValidators();
        control?.setValue(null);
      }
      control?.updateValueAndValidity();
    });
  }
}