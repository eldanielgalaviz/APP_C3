import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../../shared/imports';
import { FormBuilder, Validators } from '@angular/forms';
import { onlyNumbersKey } from '../../../../../../utils/regex';
import { Origination } from '../../../../../../service/Origination/origination-feasibility.service';
import { CatalogsService } from '../../../../../../service/Origination/origination-catalogs.service';
import { authGuardService } from '../../../../../../service/authGuard.service';
import { ObservableService } from '../../../../../../service/observable/Observable.service';
import { forkJoin } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Respuesta } from '../../../../../interfaces/apiResponse.interface';
import { prospectOnboarding, ProspectOnboardingPayload } from '../../../../../interfaces/origination/prospect/prospect-onboarding.interface';
import {
  State, ProjectState, Municipality, Neighborhood,
  LandTenureType, PropertyType, Programme, ProspectPriority,
  AgrarianNucleus, LocationByCP
} from '../../../../../interfaces/origination/prospect/prospect-onboarding-catalogs.interface';
import { PermissionUser } from '../../../../../../utils/permission-user.service';
import { Project } from '../../../../../interfaces/projects/projects.interface';

@Component({
  selector: 'app-prospect-onboarding',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY],
  templateUrl: './prospect-onboarding.component.html',
  providers: [MessageService]
})
export class ProspectOnboardingComponent implements OnInit {

  private _fb                  = inject(FormBuilder);
  private _catalogsService     = inject(CatalogsService);
  private _authGuardService    = inject(authGuardService);
  private _observableService   = inject(ObservableService);
  private _messageService      = inject(MessageService);
  private _originationService  = inject(Origination);
  private _permissionUser      = inject(PermissionUser);

  token: string = this._authGuardService.getToken() || '';

  propertyUploading: boolean  = false;
  propertyUploaded: boolean   = false;
  propertyFile: File | null   = null;
  propertyPath: string        = '';
  propertyUrl: string         = '';
  polygonFile: File | null = null;
  data: prospectOnboarding | null = null;
  hasData: boolean = false;
  formChanged: boolean = false;

  /** Estado del componente */
  projectalive: boolean = false;
  position: 'center' | 'top' | 'bottom' | 'left' | 'right' |
            'topleft' | 'topright' | 'bottomleft' | 'bottomright' = 'bottom';
  visible: boolean              = false;
  mostrarBoton: boolean         = false;
  onlyNumbers                   = onlyNumbersKey;
  isInsert: boolean             = true;
  isEditMode: boolean           = false;
  currentProspectContactId: number    = 0;
  currentProjectId: number | null     = null;
  project: Project | null             = null;
  permissions: Record<string, boolean> = {};
  private isLoadingData: boolean      = false;

  /** Modal Project Alive — pendiente de implementar */
  state: any[] = [];
  isSaving: boolean = false;

  /** Catálogos */
  states: State[]                  = [];
  projectstate: ProjectState[]     = [];
  landMunicipalities: Municipality[] = [];
  municipalities: Municipality[]   = [];
  neighborhoods: Neighborhood[]    = [];
  landTenureTypes: LandTenureType[] = [];
  propertytype: PropertyType[]     = [];
  programme: Programme[]           = [];
  prospectpriority: ProspectPriority[] = [];
  agrarianNucleus: AgrarianNucleus[] = [];

  /** Formulario */
  form = this._fb.group({
    landState:               [null as ProjectState | null, Validators.required],
    municipality:            [null as Municipality | null, Validators.required],
    nucleoAgrario:           [''],
    nucleoAgrarioVal:        [null as AgrarianNucleus | null],
    landTenureType:          [null as LandTenureType | null],
    linkPolygon:             [''],
    projectCounterpart:      ['',   Validators.required],
    prospectContactName:     ['',   Validators.required],
    prospectContactRole:     ['',   Validators.required],
    prospectContactTelephone:['',   Validators.required],
    prospectContactEmail:    ['',   [Validators.required, Validators.email]],
    zipCode:                 ['',   [Validators.required, Validators.pattern(/^\d{5}$/)]],
    addressState:            [null as State | null,        Validators.required],
    addressMunicip:          [null as Municipality | null, Validators.required],
    colony:                  [null as Neighborhood | null, Validators.required],
    street:                  [''],
    exteriorNumber:          [''],
    interiorNumber:          [''],
    projectName:             ['',   Validators.required],
    projectType:             [null as PropertyType | null,     Validators.required],
    programe:                [null as Programme | null,         Validators.required],
    priority:                [null as ProspectPriority | null,  Validators.required],
    description:             [''],
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!(control?.invalid && control?.touched);
  }

  ngOnInit(): void {
    this.loadCatalogsAndData();
    this.initValueChanges();
    this.form.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  private loadCatalogsAndData(): void {
    forkJoin({
      states:          this._catalogsService.getStates(this.token),
      projectStates:   this._catalogsService.getProjectStates(this.token),
      landTenureTypes: this._catalogsService.getLandTenureType(this.token),
      propertytype:    this._catalogsService.getPropertyType(this.token),
      programme:       this._catalogsService.getProgram(this.token),
      priority:        this._catalogsService.getProspectPriority(this.token),
    }).subscribe({
      next: (res) => {
        this.states           = res.states.result;
        this.projectstate     = res.projectStates.result;
        this.landTenureTypes  = res.landTenureTypes.result;
        this.propertytype     = res.propertytype.result;
        this.programme        = res.programme.result;
        this.prospectpriority = res.priority.result;

        this.loadPermissions();

        this._observableService.selectedProject$.subscribe((project: Project) => {
          if (project && project.Id_projects !== 0) {
            this.project          = project;
            this.isEditMode       = true;
            this.currentProjectId = project.Id_projects;
            this.loadData(project.Id_projects);
          } else {
            this.project                  = null;
            this.isEditMode               = false;
            this.currentProjectId         = null;
            this.currentProspectContactId = 0;
            this.mostrarBoton             = false;
          }
        });
      },
      error: (err) => console.error('Error cargando catálogos:', err)
    });
  }

  private initValueChanges(): void {
    this.form.get('landState')?.valueChanges.subscribe((state: ProjectState | null) => {
      if (this.isLoadingData || !state) return;
      this.landMunicipalities = [];
      this.agrarianNucleus    = [];
      this.form.get('municipality')?.setValue(null, { emitEvent: false });
      this.form.get('nucleoAgrarioVal')?.setValue(null, { emitEvent: false });
      this._catalogsService.getMunicipalitiesByState(state.Id_state, this.token).subscribe((res: Respuesta) => {
        this.landMunicipalities = res.result;
      });
    });

    this.form.get('nucleoAgrario')?.valueChanges.subscribe((value: string | null) => {
      if (this.isLoadingData) return;
      const control = this.form.get('nucleoAgrarioVal');
      if (value === 'yes') {
        control?.setValidators(Validators.required);
        const comunal = this.landTenureTypes.find(x => x.Id_land_tenure === 1) || null;
        this.form.patchValue({ landTenureType: comunal });
      } else {
        control?.clearValidators();
        control?.setValue(null);
        this.form.patchValue({ landTenureType: null });
      }
      control?.updateValueAndValidity();
    });
  }

  loadData(projectId: number): void {
    this._originationService.getOrigination(projectId, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.result && res.result.length > 0) {
          const data = res.result[0] as prospectOnboarding;
          this.data = data;
          this.hasData = true;
          this.formChanged = false;
          this.isInsert                 = false;
          this.currentProspectContactId = data.Id_prospect_contact;

          this.form.patchValue({
            prospectContactName:      data.prospect_contact_name,
            prospectContactRole:      data.prospect_contact_role,
            prospectContactTelephone: data.prospect_contact_telephone,
            prospectContactEmail:     data.prospect_contact_email,
            street:                   data.street,
            exteriorNumber:           String(data.exterior_number),
            interiorNumber:           String(data.interior_number),
            programe:     this.programme.find(x => x.Id_program === data.program_id) || null,
            projectType:  this.propertytype.find(x => x.Id_property_type === data.id_property_type) || null,
            priority:     this.prospectpriority.find(x => x.Id_prospect_priority === data.prospect_priority_id) || null,
            description:       data.prospect_description,
            projectName:       data.project_name,
            projectCounterpart: data.project_counterpart,
            linkPolygon:       data.link_property_polygon,
            landTenureType:    this.landTenureTypes.find(x => x.Id_land_tenure === data.Id_land_tenure) || null,
          }, { emitEvent: false });
          
          this.propertyPath = data.link_property_polygon || '';
            if (data.link_property_polygon) {
              this._originationService.getFileWithPath(data.link_property_polygon, this.token).subscribe((blob: Blob) => {
                this.propertyUrl = URL.createObjectURL(blob);
              });
            }

          if (data.postal_code_id) {
            this._catalogsService.getLocationByCP(Number(data.postal_code), this.token).subscribe((res: Respuesta) => {
              const locations = res.result as LocationByCP[];
              if (locations?.length > 0) {
                this.neighborhoods = locations.map(x => ({
                  neighborhood_name: x.neighborhood_name,
                  Id_postal_code:    x.Id_postal_code
                }));
                const matchedState = this.states.find(x => x.state_name === locations[0].state_name);
                if (matchedState) {
                  this._catalogsService.getMunicipalitiesbyid(matchedState.Id_states, this.token).subscribe((mRes: Respuesta) => {
                    this.municipalities = mRes.result as Municipality[];
                    const matchedMunicip = this.municipalities.find(x => x.municipality_name === locations[0].municipality_name);
                    const matchedColony  = this.neighborhoods.find(x => x.Id_postal_code === data.neighborhood_id);
                    this.form.patchValue({
                      zipCode:        String(data.postal_code),
                      addressState:   matchedState,
                      addressMunicip: matchedMunicip || null,
                      colony:         matchedColony  || null
                  }, { emitEvent: false });
                  });
                } else {
                  const matchedColony = this.neighborhoods.find(x => x.Id_postal_code === data.neighborhood_id);
                  this.form.patchValue({ zipCode: String(data.postal_code), colony: matchedColony || null }, { emitEvent: false });
                }
              }
            });
          }

          if (data.Id_state) {
            const matchedLandState = this.projectstate.find(x => x.Id_state === data.Id_state);
            if (matchedLandState) {
              this._catalogsService.getMunicipalitiesByState(data.Id_state, this.token).subscribe((mRes: Respuesta) => {
                this.landMunicipalities = mRes.result as Municipality[];
                const matchedMunicip    = this.landMunicipalities.find(x =>
                  (x.Id_municipalities ?? x.Id_municipality) === data.Id_municipality
                );
                this.isLoadingData = true;
                this.form.get('landState')?.setValue(matchedLandState, { emitEvent: false });
                this.form.get('municipality')?.setValue(matchedMunicip || null, { emitEvent: false });

                if (data.Id_agrarian_nucleus) {
                  this._catalogsService.getAgrarianNucleusByMunicipality(data.Id_municipality, this.token).subscribe((nRes: Respuesta) => {
                    this.agrarianNucleus = nRes.result as AgrarianNucleus[];
                    const matchedNucleo  = this.agrarianNucleus.find(x => x.Id_agrarian_nucleus === data.Id_agrarian_nucleus);
                    this.form.get('nucleoAgrario')?.setValue(data.nucleo_agrario === 1 ? 'yes' : 'no', { emitEvent: false });
                    this.form.get('nucleoAgrarioVal')?.setValue(matchedNucleo || null, { emitEvent: false });
                    this.isLoadingData = false;
                  });
                } else {
                  this.form.get('nucleoAgrario')?.setValue(data.nucleo_agrario === 1 ? 'yes' : 'no', { emitEvent: false });
                  this.isLoadingData = false;
                }
              });
            }
          }
          this.mostrarBoton = true;
        } else {
          this.isInsert = true;
          this.hasData = false;
          this.formChanged = false;
        }
      },
      error: (err) => console.error('Error cargando origination:', err)
    });
  }

  onZipCodeChange(event: Event): void {
    const cp = (event.target as HTMLInputElement).value;
    if (cp?.length === 5) {
      this._catalogsService.getLocationByCP(Number(cp), this.token).subscribe((res: Respuesta) => {
        const locations = res.result as LocationByCP[];
        if (locations?.length > 0) {
          const matchedState = this.states.find(x => x.state_name === locations[0].state_name);
          this.form.patchValue({ addressState: matchedState || null });
          if (matchedState) {
            this._catalogsService.getMunicipalitiesbyid(matchedState.Id_states, this.token).subscribe((mRes: Respuesta) => {
              this.municipalities  = mRes.result as Municipality[];
              const matchedMunicip = this.municipalities.find(x => x.municipality_name === locations[0].municipality_name);
              this.form.patchValue({ addressMunicip: matchedMunicip || null });
            });
          }
          this.neighborhoods = locations.map(x => ({
            neighborhood_name: x.neighborhood_name,
            Id_postal_code:    x.Id_postal_code
          }));
          this.form.patchValue({ colony: null });
        }
      });
    }
  }

  onStateChange(state: State): void {
    if (!state) return;
    this.municipalities = [];
    this.neighborhoods  = [];
    this.form.patchValue({ addressMunicip: null, colony: null });
    this._catalogsService.getMunicipalitiesbyid(state.Id_states, this.token).subscribe((res: Respuesta) => {
      this.municipalities = res.result as Municipality[];
    });
  }

  onMunicipalityChange(municipality: Municipality): void {
    if (!municipality) return;
    this.neighborhoods = [];
    this.form.patchValue({ colony: null });
    this._catalogsService.getNeighborhoodsByMunicipality(municipality.Id_municipalities, this.token).subscribe((res: Respuesta) => {
      this.neighborhoods = res.result as Neighborhood[];
    });
  }

  onMunicipalityLandChange(municipality: Municipality): void {
    if (!municipality) return;
    this.agrarianNucleus = [];
    this.form.patchValue({ nucleoAgrarioVal: null });
    const id = municipality.Id_municipality ?? municipality.Id_municipalities;
    this._catalogsService.getAgrarianNucleusByMunicipality(id, this.token).subscribe((res: Respuesta) => {
      this.agrarianNucleus = res.result as AgrarianNucleus[];
    });
  }

  projectAlive(position: 'center' | 'top' | 'bottom' | 'left' | 'right' |
               'topleft' | 'topright' | 'bottomleft' | 'bottomright'): void {
    this.position     = position;
    this.projectalive = true;
  }

  saveProject(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isSaving) return;
    this.isSaving = true;

    const f = this.form.value;

    const payload: ProspectOnboardingPayload = {
      Id_prospect_contact:        this.isEditMode ? this.currentProspectContactId : 0,
      projects_id:                this.isEditMode ? this.currentProjectId : null,
      prospect_contact_name:      f.prospectContactName      ?? '',
      prospect_contact_role:      f.prospectContactRole      ?? '',
      prospect_contact_telephone: f.prospectContactTelephone ?? '',
      prospect_contact_email:     f.prospectContactEmail     ?? '',
      postal_code_id:             f.colony?.Id_postal_code   ?? null,
      neighborhood_id:            f.colony?.Id_postal_code   ?? null,
      municipalities_id:          f.addressMunicip?.Id_municipalities ?? null,
      street:                     f.street                   ?? '',
      exterior_number:            Number(f.exteriorNumber),
      interior_number:            Number(f.interiorNumber    || null),
      program_id:                 f.programe?.Id_program     ?? null,
      id_property_type:           f.projectType?.Id_property_type ?? null,
      prospect_priority_id:       f.priority?.Id_prospect_priority ?? null,
      project_alive_id:           1,
      project_description:        f.description              ?? '',
      project_name:               f.projectName              ?? '',
      project_counterpart:        f.projectCounterpart       ?? '',
      Id_state:                   f.landState?.Id_state                 ?? null,
      Id_municipality:            f.municipality?.Id_municipality ?? f.municipality?.Id_municipalities ?? null,
      id_agrarian_nucleus:        f.nucleoAgrarioVal?.Id_agrarian_nucleus ?? null,
      link_property_polygon:      f.linkPolygon              ?? '',
      Id_land_tenure:             f.landTenureType?.Id_land_tenure ?? null,
      nucleo_agrario:             f.nucleoAgrario === 'yes' ? 1 : 2,
    };
    const namedFiles: { key: string, file: File }[] = [];
    if (this.polygonFile) {
      namedFiles.push({ key: 'docPolygon', file: this.polygonFile });
    }

    this._originationService.setOrigination(payload, namedFiles, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.result?.[0]?.success === 1) {
          this._messageService.add({ severity: 'success', summary: 'Success', detail: 'Project saved successfully' });
          this.mostrarBoton = true;
          this.loadData(this.currentProjectId ?? res.result[0].id);
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not save the project' });
        }
      },
      error: () => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred while saving' });
      }
    });
  }

  onPolygonSelect(event: { files: File[] }): void {
    const file = event.files[0];
    if (!file) return;
    if (!file.name.endsWith('.zip') && file.type !== 'application/zip') {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Only .ZIP files are allowed' });
      return;
    }
    this.propertyUploading = true;
    this.polygonFile = file;
    setTimeout(() => {
      this.propertyUploading = false;
      this.propertyUrl  = URL.createObjectURL(this.polygonFile!);
      this.propertyPath = this.polygonFile?.name || '';
    }, 500);
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