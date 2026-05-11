import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../../../shared/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { onlyNumbersKey } from '../../../../../../utils/regex';
import { Origination } from '../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../service/Origination/origination-catalogs.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { prospectOnboarding } from '../../../../../interfaces/origination/prospect/prospect-onboarding.interface';


@Component({
  selector: 'app-prospect-onboarding',
  imports: [SHARED_IMPORTS],
  templateUrl: './prospect-onboarding.component.html',
  providers: [MessageService]
})
export class ProspectOnboardingComponent implements OnInit {

  form!: FormGroup;
  state: any[] | undefined;
  projectalive: boolean = false;
  position: any = 'bottom';
  visible: boolean = false;
  selectedNucleo: string = '';
  mostrarBoton: boolean = false;
  onlyNumbers = onlyNumbersKey;
  token: any;
  project: any;
  isInsert: boolean = true;
  canEdit: boolean = false;
  canCreate: boolean = false;

  isEditMode: boolean = false;
  currentProspectContactId: number = 0;
  currentProjectId: number | null = null;

  states: any[] = [];
  landMunicipalities: any[] = [];
  municipalities: any[] = [];
  neighborhoods: any[] = [];
  landtenuretypes: any;
  landTenureTypes: any[] = [];
  propertytype: any[] = [];
  programme: any[] = [];
  prospectpriority: any[] = [];
  projectstate: any[] = [];
  agrarianNucleus: any[] = [];
  private isLoadingData: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _catalogsService: CatalogsService,
    private _authGuardService: authGuardService,
    private _observableService: ObservableService,
    private _messageService: MessageService,
    private router: Router,
    private authService: authGuardService,
    private originationService: Origination
  ) {}

  projectAlive(position: any) {
    this.position = position;
    this.projectalive = true;
  }

  showDialog() { this.visible = true; }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  onZipCodeChange(event: any) {
    const cp = event.target.value;
    if (cp?.length === 5) {
      this._catalogsService.getLocationByCP(cp, this.token).subscribe((res: any) => {
        if (res.result && res.result.length > 0) {
          const location = res.result[0];
          const matchedState = this.states.find(x => x.state_name === location.state_name);
          this.form.patchValue({ addressState: matchedState || null });
          if (matchedState) {
            this._catalogsService.getMunicipalitiesbyid(matchedState.Id_states, this.token).subscribe((mRes: any) => {
              this.municipalities = mRes.result;
              const matchedMunicip = this.municipalities.find(x => x.municipality_name === location.municipality_name);
              this.form.patchValue({ addressMunicip: matchedMunicip || null });
            });
          }
          this.neighborhoods = res.result.map((x: any) => ({
            neighborhood_name: x.neighborhood_name,
            Id_postal_code: x.Id_postal_code
          }));
          this.form.patchValue({ colony: null });
        }
      });
    }
  }

  onLandStateChange(state: any) {
    if (!state) return;
    this.landMunicipalities = [];
    this.form.patchValue({ municipality: null });
    this._catalogsService.getMunicipalitiesbyid(state.Id_states, this.token).subscribe((res: any) => {
      this.landMunicipalities = res.result;
    });
  }

  onStateChange(state: any) {
    if (!state) return;
    this.municipalities = [];
    this.neighborhoods = [];
    this.form.patchValue({ addressMunicip: null, colony: null });
    this._catalogsService.getMunicipalitiesbyid(state.Id_states, this.token).subscribe((res: any) => {
      this.municipalities = res.result;
    });
  }

  onMunicipalityChange(municipality: any) {
    if (!municipality) return;
    this.neighborhoods = [];
    this.form.patchValue({ colony: null });
    this._catalogsService.getNeighborhoodsByMunicipality(municipality.Id_municipalities, this.token).subscribe((res: any) => {
      this.neighborhoods = res.result;
    });
  }

  onLandStateChange2(state: any) {
    if (this.isLoadingData) return; 
    if (!state) return;
    this.landMunicipalities = [];
    this.agrarianNucleus = [];
    this.form.patchValue({ municipality: null, nucleoAgrarioVal: null });
    this._catalogsService.getMunicipalitiesByState(state.Id_state, this.token).subscribe((res: any) => {
      this.landMunicipalities = res.result;
    });
  }

  onMunicipalityLandChange(municipality: any) {
    if (!municipality) return;
    this.agrarianNucleus = [];
    this.form.patchValue({ nucleoAgrarioVal: null });
    const id = municipality.Id_municipality ?? municipality.Id_municipalities;
    this._catalogsService.getAgrarianNucleusByMunicipality(id, this.token).subscribe((res: any) => {
      this.agrarianNucleus = res.result;
    });
  }

  loadData(projectId: number) {
    this.originationService.getOrigination(projectId, this.token).subscribe({
      next: (res: any) => {
        if (res.result && res.result.length > 0) {
          const data: prospectOnboarding = res.result[0] as prospectOnboarding;
          this.isInsert = false;
          this.currentProspectContactId = data.Id_prospect_contact;
          this.form.patchValue({
            prospectContactName:      data.prospect_contact_name,
            prospectContactRole:      data.prospect_contact_role,
            prospectContactTelephone: data.prospect_contact_telephone,
            prospectContactEmail:     data.prospect_contact_email,
            street:                   data.street,
            exteriorNumber:           data.exterior_number,
            interiorNumber:           data.interior_number,
            programe:                 this.programme.find(x => x.Id_program === data.program_id) || null,
            projectType:              this.propertytype.find(x => x.Id_property_type === data.id_property_type) || null,
            priority:                 this.prospectpriority.find(x => x.Id_prospect_priority === data.prospect_priority_id) || null,
            description: data.prospect_description,
            projectName:              data.project_name,
            projectCounterpart:       data.project_counterpart,
            linkPolygon:              data.link_property_polygon,
            landTenureType:           this.landTenureTypes.find(x => x.Id_land_tenure === data.Id_land_tenure) || null,
          });

          if (data.postal_code_id) {
            this._catalogsService.getLocationByCP(data.postal_code, this.token).subscribe((res: any) => {
              if (res.result?.length > 0) {
                this.neighborhoods = res.result.map((x: any) => ({
                  neighborhood_name: x.neighborhood_name,
                  Id_postal_code: x.Id_postal_code
                }));

                const matchedState = this.states.find(x => x.state_name === res.result[0].state_name);

                if (matchedState) {
                  this._catalogsService.getMunicipalitiesbyid(matchedState.Id_states, this.token).subscribe((mRes: any) => {
                    this.municipalities = mRes.result;

                    const matchedMunicip = this.municipalities.find(x => x.municipality_name === res.result[0].municipality_name);

                    const matchedColony = this.neighborhoods.find(x => x.Id_postal_code === data.neighborhood_id);

                    this.form.patchValue({
                      zipCode:        String(data.postal_code),
                      addressState:   matchedState,
                      addressMunicip: matchedMunicip || null,
                      colony:         matchedColony  || null
                    });
                  });
                } else {
                  const matchedColony = this.neighborhoods.find(x => x.Id_postal_code === data.neighborhood_id);
                  this.form.patchValue({
                    zipCode: String(data.postal_code),
                    colony:  matchedColony || null
                  });
                }
              }
            });
          }
          if (data.Id_state) {
            const matchedLandState = this.projectstate.find(x => x.Id_state === data.Id_state || x.Id_states === data.Id_state);

            if (matchedLandState) {
              this._catalogsService.getMunicipalitiesByState(data.Id_state, this.token).subscribe((mRes: any) => {
                this.landMunicipalities = mRes.result;

                const matchedMunicip = mRes.result.find((x: any) => (x.Id_municipalities ?? x.Id_municipality) === data.Id_municipality);
                this.isLoadingData = true;
                this.form.get('landState')?.setValue(matchedLandState, { emitEvent: false });
                this.form.get('municipality')?.setValue(matchedMunicip || null, { emitEvent: false });

                if (data.Id_agrarian_nucleus) {
                  this._catalogsService.getAgrarianNucleusByMunicipality(data.Id_municipality, this.token).subscribe((nRes: any) => {
                    this.agrarianNucleus = nRes.result;
                    const matchedNucleo = this.agrarianNucleus.find(x => x.Id_agrarian_nucleus === data.Id_agrarian_nucleus);
                    this.form.get('nucleoAgrario')?.setValue('yes', { emitEvent: false });
                    this.form.get('nucleoAgrarioVal')?.setValue(matchedNucleo || null, { emitEvent: false });
                    this.isLoadingData = false;
                  });
                } else {
                  this.form.get('nucleoAgrario')?.setValue('no', { emitEvent: false });
                  this.isLoadingData = false;
                }
              });
            }
          }
          this.mostrarBoton = true;
        } else {
          this.isInsert = true;
        }
      },
      error: (err) => console.error('Error cargando origination:', err)
    });
  }

  saveProject() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;

    const payload = {
      Id_prospect_contact:        this.isEditMode ? this.currentProspectContactId : 0,
      projects_id:                this.isEditMode ? this.currentProjectId : null,
      prospect_contact_name:      f.prospectContactName,
      prospect_contact_role:      f.prospectContactRole,
      prospect_contact_telephone: f.prospectContactTelephone,
      prospect_contact_email:     f.prospectContactEmail,
      postal_code_id:             f.colony?.Id_postal_code          ?? null,
      neighborhood_id:            f.colony?.Id_postal_code          ?? null,
      municipalities_id:          f.addressMunicip?.Id_municipalities ?? null,
      street:                     f.street,
      exterior_number:            Number(f.exteriorNumber),
      interior_number:            Number(f.interiorNumber || null),
      program_id:                 f.programe?.Id_program             ?? null,
      id_property_type:           f.projectType?.Id_property_type ?? null,
      prospect_priority_id:       f.priority?.Id_prospect_priority   ?? null,
      project_alive_id:           1,
      project_description:        f.description,
      project_name:               f.projectName,
      project_counterpart:        f.projectCounterpart,
      id_agrarian_nucleus:          f.nucleoAgrarioVal?.Id_agrarian_nucleus ?? null,
      link_property_polygon:      f.linkPolygon,
      Id_land_tenure:             f.landTenureType?.Id_land_tenure   ?? null,
    };

    this.originationService.setOrigination(payload, this.token).subscribe({
      next: (res: any) => {
        if (res.result?.[0]?.success === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Project saved successfully' });
          this.mostrarBoton = true;
          this.loadData(this.currentProjectId ?? res.result[0].id);
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save the project' });
        }
      },
      error: () => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  ngOnInit() {
    this.token = this._authGuardService.getToken();

    forkJoin({
      states:          this._catalogsService.getStates(this.token),
      projectStates:   this._catalogsService.getProjectStates(this.token),
      landTenureTypes: this._catalogsService.getLandTenureType(this.token),
      propertytype:    this._catalogsService.getPropertyType(this.token),
      programme:       this._catalogsService.getProgram(this.token),
      priority:        this._catalogsService.getProspectPriority(this.token),
    }).subscribe({
      next: (res: any) => {
        this.states          = res.states.result;
        this.projectstate    = res.projectStates.result;
        this.landTenureTypes = res.landTenureTypes.result;
        this.propertytype    = res.propertytype.result;
        this.programme       = res.programme.result;
        this.prospectpriority = res.priority.result;
        this.applyPermissions();
        
        this._observableService.selectedProject$.subscribe(project => {
          if (project && project.Id_projects !== 0) {
            this.project = project;
            this.isEditMode       = true;
            this.currentProjectId = project.Id_projects;
            this.loadData(project.Id_projects);
          } else {
            this.project                 = null;
            this.isEditMode              = false;
            this.currentProjectId        = null;
            this.currentProspectContactId = 0;
            this.mostrarBoton            = false;
          }
        });
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });

    this.form = this.fb.group({
      landState:        [null, Validators.required],
      municipality:     [null, Validators.required],
      nucleoAgrario:    ['',   Validators.required],
      nucleoAgrarioVal: [null],
      landTenureType:   [null, Validators.required],
      linkPolygon:      ['',   Validators.required],
      projectCounterpart:       ['', Validators.required],
      prospectContactName:      ['', Validators.required],
      prospectContactRole:      ['', Validators.required],
      prospectContactTelephone: ['', [Validators.required]],
      prospectContactEmail:     ['', [Validators.required, Validators.email]],
      zipCode:        ['',  [Validators.required, Validators.pattern(/^\d{5}$/)]],
      addressState:   [null, Validators.required],
      addressMunicip: [null, Validators.required],
      colony:         [null, Validators.required],
      street:         ['',   Validators.required],
      exteriorNumber: [''],
      interiorNumber: [''],
      projectName:  ['',   Validators.required],
      projectType:  [null, Validators.required],
      programe:     [null, Validators.required],
      priority:     [null, Validators.required],
      description:  ['',   Validators.required],
    });

    this.form.get('landState')?.valueChanges.subscribe(state => {
      if (this.isLoadingData) return;
      if (!state) return;
      this.landMunicipalities = [];
      this.agrarianNucleus = [];
      this.form.get('municipality')?.setValue(null, { emitEvent: false });
      this.form.get('nucleoAgrarioVal')?.setValue(null, { emitEvent: false });
      this._catalogsService.getMunicipalitiesByState(state.Id_state, this.token).subscribe((res: any) => {
        this.landMunicipalities = res.result;
      });
    });

    this.form.get('nucleoAgrario')?.valueChanges.subscribe(value => {
      if (this.isLoadingData) return; 
      const control = this.form.get('nucleoAgrarioVal');
      if (value === 'yes') {
        control?.setValidators(Validators.required);
        const comunal = this.landTenureTypes.find(x => x.Id_land_tenure === 1);
        this.form.patchValue({ landTenureType: comunal });
      } else {
        control?.clearValidators();
        control?.setValue(null);
        this.form.patchValue({ landTenureType: null });
      }
      control?.updateValueAndValidity();
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