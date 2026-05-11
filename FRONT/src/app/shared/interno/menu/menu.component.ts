import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SHARED_IMPORTS } from '../../imports';
import { Router } from '@angular/router';
import { authGuardService } from '../../../../service/authGuard.service';
import { ProjectsService } from '../../../../service/projects/projects.service';
import { Project } from '../../../interfaces/projects/projects.interface';
import { ObservableService } from '../../../../service/observable/Observable.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  items: MenuItem[] | undefined;
  avatar: MenuItem[] | undefined;
  sidebarPerfil: boolean = false;

  countries: any[] | undefined;
  selectedCountry?: Project;

  token: any;
  user: any;
  projects: Project[] = [];

  constructor(
    private router: Router,
    private _authGuardService: authGuardService,
    private _projectServices: ProjectsService,
    private readonly serviceObsProject$: ObservableService,
  ) {
  this.user = this._authGuardService.getUser();
  this.token = this._authGuardService.getToken();


  }

  ngOnInit() {

    this.avatar = [
      { label: 'Generate folio' },
      { label: 'Training' },
      { label: 'Privacy Policy' },
      { label: 'Terms and Conditions' },
    ];

    this.items = [
      {
        label: 'Master Dashboard',
        command: () => {
          this.selectedCountry = undefined;
          this.serviceObsProject$.setProject(null as any);
          sessionStorage.removeItem('selectedOption');
          this.router.navigate(['/Inicio']);
        }
      },
      {
        label: 'Corporate',
        items: [
          { label: 'Expenses review', icon: 'fa-solid fa-code-compare' },
          { label: 'Agreements', icon: 'fa-solid fa-handshake' },
        ]
      },
      {
        label: 'Tools',
        command: () => { 
          this.selectedCountry = undefined;
          sessionStorage.removeItem('selectedOption');
          this.serviceObsProject$.setProject(null as any);
          this.router.navigate(['/tools']);
        }
      },
    ];

    this.getProjects();
    this.observaProjectSelected();
  }

  getProjects() {
    this._projectServices.getProjects(this.token?.access_token).subscribe((response: any) => {
      this.projects = response.result;
      const savedValue = this._authGuardService.getProject();
      if (savedValue) {
        const found = this.projects.find(x => x.project_name === savedValue);
        if (found) {
          this.selectedCountry = found;
          this.serviceObsProject$.setProject(found);
        }
      }
    });
  }

  onProjectSelected(project: Project | null) {
    if (project) {
      this.serviceObsProject$.setProject(project);
      sessionStorage.setItem('selectedOption', project.project_name);

      const currentUrl = this.router.url;
      const isInsidePortafolio = currentUrl.startsWith('/portafolio');

      if (isInsidePortafolio) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      } else {
        this.router.navigate(['/portafolio']);
      }
    } else {
      this.serviceObsProject$.setProject(null as any);
      sessionStorage.removeItem('selectedOption');
      this.router.navigate(['/Inicio']);
    }
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  observaProjectSelected() {
    this.serviceObsProject$.selectedProject$.subscribe((project: Project) => {
      if (project) {
        this.selectedCountry = this.projects.find(x => x.Id_projects === project.Id_projects);
      } else {
        this.selectedCountry = undefined;
      }
    });
  }

  logout(): void {
    this._authGuardService.clearSession();
    sessionStorage.clear();
    this.serviceObsProject$.setProject(null as any);
    this.router.navigate(['/']);
  }
}