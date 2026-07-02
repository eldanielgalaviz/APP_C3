import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_OVERLAY, PRIMENG_NAVIGATION, PRIMENG_LAYOUT, PRIMENG_MISC } from '../../imports';
import { Router } from '@angular/router';
import { authGuardService } from '../../../../service/authGuard.service';
import { ProjectsService } from '../../../../service/projects/projects.service';
import { Project } from '../../../interfaces/projects/projects.interface';
import { ObservableService } from '../../../../service/observable/Observable.service';
import { buildMenuMap } from '../../../../utils/menu.utils';
import { MenuModule } from '../../../interfaces/menu/Menu.interface';
import { LoggedUser } from '../../../interfaces/auth/LoggedUser.interface';
import { Respuesta } from '../../../interfaces/apiResponse.interface';
import { ProfileImageService } from '../../../../service/tools/users/profileImage.service';
import { ProfileImageResponse } from '../../../interfaces/auth/ProfileImage.interface';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION, ...PRIMENG_LAYOUT, ...PRIMENG_MISC],
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
  user: LoggedUser | null = null;
  projects: Project[] = [];
  hoverAvatar: boolean = false;
  menuCorporate: MenuItem[] = [];
  menuTools: MenuItem[] = [];

  private _profileImageService = inject(ProfileImageService);
  profileImage: string = 'user4.png';
  constructor(
    private router: Router,
    private _authGuardService: authGuardService,
    private _projectServices: ProjectsService,
    private readonly serviceObsProject$: ObservableService,

  ) {
    this.user = this._authGuardService.getUser();
    this.token = this._authGuardService.getToken();

    const userPermissions = this._authGuardService.getPermissions();
    const menuMap = buildMenuMap(userPermissions);

    this.menuCorporate = menuMap.get(MenuModule.CORPORATE) ?? [];
    this.menuTools = menuMap.get(MenuModule.TOOLS) ?? [];

  }

  triggerFileInput(): void {
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput?.click();
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this._profileImageService.setUserProfileImage(file, this.token).subscribe({
        next: (response: ProfileImageResponse) => {
          if (response.valido === 1 && response.result) {
            this.profileImage = response.result;
            this.loadProfileImage();

          }
        }
      });
    }
  }

  ngOnInit() {
    this.loadProfileImage();

    this.avatar = [
      {
        label: 'Operations',
        items: [
          { label: 'Generate folio' },
          { label: 'Tree Inventory', url: 'https://docs.google.com/spreadsheets/d/10RaeqF6_PE0ICOPwomZGNAtfY9pcYZP_KbSBj09NnoI/edit?usp=sharing' },
        ]
      },
      {
        label: 'Platforms',
        items: [
          { label: 'Download Tree Registry App', url:'https://www.appsheet.com/newshortcut/32a16d60-fe63-4d58-9cd8-1d7a9b555bf1' },
          { label: 'Tree Registry Web Portal', url:'https://www.appsheet.com/start/32a16d60-fe63-4d58-9cd8-1d7a9b555bf1' },
        ]
      },
      {
        label: 'Training & Support',
        items: [
          { label: 'Training' },
          { label: 'Intranet', url: 'https://canopiacarbon918.sharepoint.com/SitePages/Bienvenido.aspx?csf=1&web=1&share=IQBulu7FY38jSKy00zjTI4n4AdRH1GY4d_WW9c-vpga6LKM&e=VflfU7&TeamsCID=076880e2-9455-4d99-995d-81b37cc1da7f&CID=bf2d58e2-efa0-40cd-84e5-2ab267d7199d' },
        ]
      },
      {
        label: 'Information & Compliance',
        items: [
          { label: 'Terms and Conditions' },
          { label: 'Privacy Policy' },
        ]
      },







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
    ];
    if (this.menuCorporate.length > 0) {
      this.items?.push(
        this.menuCorporate[0],
      )
    }
    if (this.menuTools.length > 0) {
      this.items?.push({
        label: 'Tools',
        command: () => {
          this.selectedCountry = undefined;
          sessionStorage.removeItem('selectedOption');
          this.serviceObsProject$.setProject(null as any);
          this.router.navigate(['/tools']);
        }
      });
    }

    this.getProjects();
    this.observaProjectSelected();
  }

  getProjects(): void {
    this._projectServices.getProjects(this.token ?? '').subscribe((response: Respuesta) => {
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

  get hasProjectsAccess(): boolean {
    const perms: any[] = this._authGuardService.getPermissions();
    return perms.some((p: any) => p.module?.Idmodule === 4);
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
    this.serviceObsProject$.setProject(null!);
    this.router.navigate(['/']);
  }

  loadProfileImage(): void {
    this._profileImageService.getUserProfileImage(this.token).subscribe({
      next: (response: ProfileImageResponse) => {
        const url = response.result;
        if (response.valido === 1 && url && !url.includes('/null?') && !url.toLowerCase().includes('.heic')) {
          this.profileImage = url;
        }
      }
    });
  }

  cutName(name: string = ''): string {
    if (name.length > 3) {
      return name.substring(0, 2).toUpperCase();
    } else {
      return name;
    }
  }
}