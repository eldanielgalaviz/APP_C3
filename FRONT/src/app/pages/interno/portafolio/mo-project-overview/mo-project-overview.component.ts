import { Component, inject } from '@angular/core';
import { PRIMENG_DATA, PRIMENG_OVERLAY } from '../../../../shared/imports';
import { OriginationOverview } from '../../../../interfaces/origination/prospect/prospect-onboarding.interface';
import { Project } from '../../../../interfaces/projects/projects.interface';
import { filter, forkJoin } from 'rxjs';
import { CatalogsService } from '../../../../../service/Origination/origination-catalogs.service';
import { ObservableService } from '../../../../../service/observable/Observable.service';
import { Origination } from '../../../../../service/Origination/origination-feasibility.service';
import { LandTenureType, PropertyType, Programme } from '../../../../interfaces/origination/prospect/prospect-onboarding-catalogs.interface';
import { NavigationEnd, Router } from '@angular/router';
import { userService } from '../../../../../service/user.service';
@Component({
  selector: 'app-mo-project-overview',
  imports: [...PRIMENG_OVERLAY, PRIMENG_DATA],
  templateUrl: './mo-project-overview.component.html',
  styleUrl: './mo-project-overview.component.scss'
})
export class MoProjectOverviewComponent {

  selectedCountry?: Project;
  projectName: string = '';
  token: any;
  hideTitle = false;

  // catálogos para resolver nombres
  landTenureTypes: LandTenureType[] = [];
  propertyTypes: PropertyType[] = [];
  programmes: Programme[] = [];
  overviewData: OriginationOverview | null = null;

  // nombres resueltos para mostrar en el drawer
  overviewLandTenure: string = '';
  overviewPropertyType: string = '';
  overviewProgramme: string = '';

  project: Project | null = null;
  projects: Project[] = [];

  private _catalogsService = inject(CatalogsService);
  private _originationService = inject(Origination);

  constructor(
    private readonly serviceObsProject$: ObservableService, private router: Router,
  
  ) {
  }

  ngOnInit() {
    this.observaProjectSelected();
    this.updateHideTitle();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateHideTitle();
    });
  }

  observaProjectSelected() {
    this.serviceObsProject$.selectedProject$.subscribe((project: Project) => {
      this.project = project ?? null;
      if (project) {
        this.selectedCountry = this.projects.find(x => x.Id_projects == project.Id_projects);
        this.projectName = project.project_name || '';
        this.loadOverview(project.Id_projects);
      }
      this.updateHideTitle();
    });
  }

  updateHideTitle() {
    const isProspectRoute = this.router.url.includes('/portafolio/origination/prospect');
    this.hideTitle = isProspectRoute && !this.project;
  }

  loadOverview(projectId: number): void {
    if (!projectId || projectId === 0) return;
    forkJoin({
      overview: this._originationService.getOverview(projectId, this.token),
      landTenureTypes: this._catalogsService.getLandTenureType(this.token),
      propertyTypes: this._catalogsService.getPropertyType(this.token),
    }).subscribe({
      next: (res) => {
        this.landTenureTypes = res.landTenureTypes.result;
        this.propertyTypes = res.propertyTypes.result;

        if (res.overview.valido === 1 && res.overview.result.length > 0) {
          const data = res.overview.result[0] as OriginationOverview;
          this.overviewData = data;
          this.overviewLandTenure = this.landTenureTypes.find(x => x.Id_land_tenure === data.Id_land_tenure)?.land_tenure_type ?? '';
          this.overviewPropertyType = this.propertyTypes.find(x => x.Id_property_type === data.id_property_type)?.description ?? '';
        }
      },
      error: (err) => console.error('Error cargando overview:', err)
    });
  }
}
