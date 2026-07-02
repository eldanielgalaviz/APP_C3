import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION, PRIMENG_LAYOUT } from '../../../../shared/imports';
import { ListPlanBeneComponent } from './ListPlanKeymiles/list-plan-bene/list-plan-bene.component';
import { ListPlanCommComponent } from './ListPlanKeymiles/list-plan-comm/list-plan-comm.component';
import { ListPlanImpleComponent } from './ListPlanKeymiles/list-plan-imple/list-plan-imple.component';
import { ListPlanOriginComponent } from './ListPlanKeymiles/list-plan-origin/list-plan-origin.component';
import { ListPlanRegisComponent } from './ListPlanKeymiles/list-plan-regis/list-plan-regis.component';
import { ListPlanRepoComponent } from './ListPlanKeymiles/list-plan-repo/list-plan-repo.component';
import { ListPlanSettComponent } from './ListPlanKeymiles/list-plan-sett/list-plan-sett.component';
import { ListPlanVeriComponent } from './ListPlanKeymiles/list-plan-veri/list-plan-veri.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mo-planning-key',
  imports: [...PRIMENG_NAVIGATION, ...PRIMENG_FORM, 
    ListPlanBeneComponent,
    ListPlanCommComponent,
    ListPlanImpleComponent,
    ListPlanOriginComponent,
    ListPlanRegisComponent,
    ListPlanRepoComponent,
    ListPlanSettComponent,
    ListPlanVeriComponent,
  ],
  templateUrl: './mo-planning-key.component.html',
  styleUrl: './mo-planning-key.component.scss'
})
export class MoPlanningKeyComponent {

  rp: any[] | undefined;
  form!: FormGroup;
  

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    
    this.rp = [
      { name: 'RP1' },
      { name: 'RP2' },
      { name: 'RP3' },
    ];

    this.form = this.fb.group({
      eventDate: [null, Validators.required],
      description: ['', Validators.required],
      decisions: ['', Validators.required],
      agreements: ['', Validators.required],
      milestone: [null, Validators.required],
      category: [null, Validators.required],
      typeEvidence: [null, Validators.required],
      notes: ['', Validators.required],
      rp: [null, Validators.required],
    });
  }

}
