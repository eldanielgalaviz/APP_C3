import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Respuesta } from '../../../../../../interfaces/apiResponse.interface';
// import { TeamAndPlan } from '../../../../../../interfaces/origination/team-and-plan/team-and-plan-payload.interface';

import { TeamAndPlan } from '../../../../../../interfaces/origination/team-and-plan/team-and-plan.interface';
import { TeamAndPlanPayload } from '../../../../../../interfaces/origination/team-and-plan/team-and-plan-payload.interface';

import {
  SmeArea, OriginationPromoterCat, SmeAreaGrouped
} from '../../../../../../interfaces/origination/team-and-plan/team-and-plan-catalogs.interface';
import { PermissionUser } from '../../../../../../../utils/permission-user.service';

@Component({
  selector: 'team-and-plan',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './team-and-plan.component.html',
  styleUrl: './team-and-plan.component.scss',
  providers: [MessageService]
})
export class TeamAndPlanComponent implements OnInit {

  private _fb                  = inject(FormBuilder);
  private _catalogsService     = inject(CatalogsService);
  private _observableService   = inject(ObservableService);
  private _authGuardService    = inject(authGuardService);
  private _messageService      = inject(MessageService);
  private _originationService  = inject(Origination);
  private _permissionUser      = inject(PermissionUser);

  token: string = this._authGuardService.getToken() || '';

  /** Estado */
  idProject: number                    = 0;
  isInsert: boolean                    = true;
  teamAndPlan!: TeamAndPlan;
  permissions: Record<string, boolean> = {};
  isSaving: boolean                    = false;
  data: TeamAndPlan | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;


  //catalogos
  /** Catálogos */
  smeOrigination:       SmeArea[]              = [];
  originationPromoters: OriginationPromoterCat[] = [];
  leadSigs:             SmeArea[]              = [];
  leadMrv:              SmeArea[]              = [];
  leadSafeguards:       SmeArea[]              = [];
  lead_desarrollo:      SmeArea[]              = [];
  leadLegal:            SmeArea[]              = [];

  /** Formulario */
  form = this._fb.group({
    originationLead:     [null as SmeArea              | null, Validators.required],
    originationPromoter: [null as OriginationPromoterCat | null, Validators.required],
    lead_desarrollo:     [null as SmeArea              | null, Validators.required],
    smeLegal:            [null as SmeArea              | null, Validators.required],
    smeSafeguards:       [null as SmeArea              | null, Validators.required],
    smeSIG:              [null as SmeArea              | null, Validators.required],
    smeMrv:              [null as SmeArea              | null, Validators.required],
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit(): void {
    this.loadPermissions();
    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });
    this.form.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  loadCatalogsAndData(): void {
    forkJoin({
      smeArea:   this._catalogsService.getSmeArea(this.token),
      promoters: this._catalogsService.getOriginationPromoter(this.token),
    }).subscribe({
      next: (res) => {
        const grouped: SmeAreaGrouped = res.smeArea.result;
        this.smeOrigination   = grouped['Origination']  ?? [];
        this.lead_desarrollo  = grouped['Development']  ?? [];
        this.leadMrv          = grouped['MRV']          ?? [];
        this.leadSigs         = grouped['SIG']          ?? [];
        this.leadSafeguards   = grouped['Safeguards']   ?? [];
        this.leadLegal        = grouped['Legal']        ?? [];
        this.originationPromoters = res.promoters.result;
        this.loadData();
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  loadData(): void {
    this._originationService.getTeamAndPlans(this.idProject, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.result && res.result.length > 0) {
          const data = res.result[0] as TeamAndPlan;
          this.data = data;
          this.hasData = true;
          this.formChanged = false;
          this.teamAndPlan = data;
          this.isInsert    = false;
          this.form.patchValue({
            originationLead:     this.smeOrigination.find(x => x.id_sme === data.id_lead_originacion)      || null,
            originationPromoter: this.originationPromoters.find(x => x.Id_origination_promoter === data.id_origination_promoter) || null,
            lead_desarrollo:     this.lead_desarrollo.find(x => x.id_sme === data.id_sme_dev_impl)         || null,
            smeLegal:            this.leadLegal.find(x => x.id_sme === data.id_sme_legal)                  || null,
            smeSafeguards:       this.leadSafeguards.find(x => x.id_sme === data.id_sme_safeguards)        || null,
            smeSIG:              this.leadSigs.find(x => x.id_sme === data.id_sme_sig)                     || null,
            smeMrv:              this.leadMrv.find(x => x.id_sme === data.id_sme_mrv)                      || null,
          }, { emitEvent: false });
        } else {
          this.isInsert = false;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error cargando team and plan:', err)
    });
  }

  saveDocument(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;

    const f = this.form.value;

    const payload: TeamAndPlanPayload = {
      p_Id_project:              this.idProject,
      p_id_lead_originacion:     f.originationLead?.id_sme,
      p_id_origination_promoter: f.originationPromoter?.Id_origination_promoter,
      p_id_sme_dev_impl:         f.lead_desarrollo?.id_sme,
      p_id_sme_legal:            f.smeLegal?.id_sme,
      p_id_sme_safeguards:       f.smeSafeguards?.id_sme,
      p_id_sme_sig:              f.smeSIG?.id_sme,
      p_id_sme_mrv:              f.smeMrv?.id_sme,
    };

    this._originationService.setTeamAndPlans(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
          this.loadCatalogsAndData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  private loadPermissions(): void {
    this._permissionUser.formatData().subscribe({
      next: (permisos: Record<string, boolean>) => {
        this.permissions = permisos;
        if (!permisos['CREATE-ORIGINATION'] && !permisos['EDIT-ORIGINATION']) {
          this.form.disable();
        }
      }
    });
  }
}