import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authGuardService } from '../../../../../../../service/authGuard.service';
import { Origination } from '../../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../../../service/observable/Observable.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { TeamAndPlan } from '../../../../../../interfaces/origination/team-and-plan/team-and-plan.interface';

@Component({
  selector: 'team-and-plan',
  imports: [SHARED_IMPORTS],
  templateUrl: './team-and-plan.component.html',
  styleUrl: './team-and-plan.component.scss',
  providers: [MessageService]
})
export class TeamAndPlanComponent implements OnInit {
  teamAndPlan!: TeamAndPlan;
  form!: FormGroup;
  leadsOriginacion: any[] = [];
  originationPromoters: any[] = [];
  leadSigs: any[] = [];
  leadMrv: any[] = [];
  leadSafeguards: any[] = [];
  leadDevelopment: any[] = [];
  lead_desarrollo: any[] = [];
  leadLegal: any[] = [];
  idProject: number = 0;
  token: any;
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _catalogsService: CatalogsService,
    private _observableService: ObservableService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private router: Router,
    private authService: authGuardService,
    private originationService: Origination
  ) {}

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit() {
    this.token = this._authGuardService.getToken();

    this.form = this.fb.group({
      originationLead:     [null, Validators.required],
      originationPromoter: [null, Validators.required],
      lead_desarrollo:      [null, Validators.required],
      smeLegal:            [null, Validators.required],
      smeSafeguards:       [null, Validators.required],
      smeSIG:              [null, Validators.required],
      smeMrv:              [null, Validators.required],
    });

    this.applyPermissions();

    this._observableService.selectedProject$.subscribe(project => {
      if (project?.Id_projects) {
        this.idProject = project.Id_projects;
        this.loadCatalogsAndData();
      }
    });
  }

  loadCatalogsAndData() {
    forkJoin({
      leads: this._catalogsService.getLeadsOriginacion(this.token),
      promoters: this._catalogsService.getOriginationPromoter(this.token),
      leadSigs: this._catalogsService.getLeadSig(this.token),
      leadMrv: this._catalogsService.getLeadMrv(this.token),
      leadSafeguards: this._catalogsService.getLeadSafeguards(this.token),
      leadDevelopment: this._catalogsService.getLeadsDesarrollo(this.token),
      leadLegal: this._catalogsService.getLeadLegal(this.token) 
    }).subscribe((res: any) => {
      this.leadsOriginacion = res.leads.result;
      this.originationPromoters = res.promoters.result;
      this.leadSigs = res.leadSigs.result;
      this.leadMrv = res.leadMrv.result;
      this.leadSafeguards = res.leadSafeguards.result;
      this.lead_desarrollo = res.leadDevelopment.result;
      this.leadLegal = res.leadLegal.result;
      this.loadData();
    });
  }

  loadData() {
    this.originationService.getTeamAndPlans(this.idProject, this.token).subscribe({
      next: (res: any) => {
        if (res.result && res.result.length > 0) {
          const data: TeamAndPlan = res.result[0];
          this.teamAndPlan = data;
          this.isInsert = false;
          this.form.patchValue({
            originationLead:     this.leadsOriginacion.find(x => x.Id_leads_originacion === data.id_lead_originacion),
            originationPromoter: this.originationPromoters.find(x => x.Id_origination_promoter === data.id_origination_promoter),
            lead_desarrollo:     this.lead_desarrollo.find(x => x.id_lead_desarrollo === data.id_sme_dev_impl),
            smeLegal:            this.leadLegal.find(x => x.Id_lead_legal === data.id_sme_legal),
            smeSafeguards:       this.leadSafeguards.find(x => x.id_lead_safeguards === data.id_sme_safeguards),
            smeSIG:              this.leadSigs.find(x => x.Id_lead_sig === data.id_sme_sig),
            smeMrv:              this.leadMrv.find(x => x.id_lead_mrv === data.id_sme_mrv),
          });
        } else {
          this.isInsert = true;
        }
      },
      error: () => {}
    });
  }

  saveDocument() {
    const payload = {
      p_Id_project:              this.idProject,
      p_id_lead_originacion:     this.form.value.originationLead?.Id_leads_originacion,
      p_id_origination_promoter: this.form.value.originationPromoter?.Id_origination_promoter,
      p_id_sme_dev_impl:         this.form.value.lead_desarrollo?.id_lead_desarrollo, 
      p_id_sme_legal:            this.form.value.smeLegal?.Id_lead_legal,
      p_id_sme_safeguards:       this.form.value.smeSafeguards?.id_lead_safeguards,
      p_id_sme_sig:              this.form.value.smeSIG?.Id_lead_sig,
      p_id_sme_mrv:              this.form.value.smeMrv?.id_lead_mrv,
    };


    this.originationService.setTeamAndPlans(payload, this.token).subscribe({
    next: (res: any) => {
      if (res.valido === 1) {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully' });
        this.loadCatalogsAndData();
      } else {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save' });
      }
    },
    error: () => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
    }
  });
  }
  
  applyPermissions(): void {
    this.canEdit   = this.authService.hasPermission(this.router.url, 'EDIT');
    this.canCreate = this.authService.hasPermission(this.router.url, 'CREATE');

    if (!this.canEdit && !this.canCreate) {
      this.form.disable();
    }
  }
}