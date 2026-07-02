import { Component } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION, PRIMENG_LAYOUT } from '../../../shared/imports';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../../interfaces/projects/projects.interface';
import { authGuardService } from '../../../../service/authGuard.service';
import { PermissionUser } from '../../../../utils/permission-user.service';
import { Respuesta } from '../../../interfaces/apiResponse.interface';
import { MenuModule } from '../../../interfaces/menu/Menu.interface';
import { buildMenuMap } from '../../../../utils/menu.utils';
import { MoProjectOverviewComponent } from './mo-project-overview/mo-project-overview.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MoPlanningKeyComponent } from './mo-planning-key/mo-planning-key.component';
import { MoProjectStatusComponent } from './mo-project-status/mo-project-status.component';
import { MoGannKeyComponent } from './mo-gann-key/mo-gann-key.component';
import { ObservableService } from '../../../../service/observable/Observable.service';


@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION, ...PRIMENG_LAYOUT,],
  providers: [
    DialogService
  ],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.scss'
})
export class PortafolioComponent {

  /** Estado del componente */

  MenuGlobal: boolean = false;

  menus: any;

  MenuProject: MenuItem[] = new Array();
  MenuGeneProject: MenuItem[] | undefined;
  Calendar: MenuItem[] | undefined;

  hideTitle = false;

  countries: any[] | undefined;
  selectedCountry?: Project;
  projectName: string = '';

  token: any;
  user: any;
  projects: Project[] = [];
  project: Project | null = null;

  constructor(private dialogService: DialogService, private _authGuardService: authGuardService, private fb: FormBuilder,
    private readonly serviceObsProject$: ObservableService,
  ) {
    this.token = this._authGuardService.getToken();
    const userPermissions = this._authGuardService.getPermissions();
    const menuMap = buildMenuMap(userPermissions);
    this.MenuProject = menuMap.get(MenuModule.PROJECTS) ?? [];
  }

  /**inicia modals */
  ref!: DynamicDialogRef;

  openOverview() {
    this.ref = this.dialogService.open(MoProjectOverviewComponent, {
      header: 'Project Overview',
      width: '50vw',
      modal: true,
      closable: true,
      dismissableMask: true
    });
  }

  openProjectStatus() {
    this.ref = this.dialogService.open(MoProjectStatusComponent, {
      header: 'Project Status',
      width: '80vw',
      modal: true,
      closable: true,
      dismissableMask: true,
      position: 'bottom'
    });
  }

  openPlanKey() {
    this.ref = this.dialogService.open(MoPlanningKeyComponent, {
      header: 'Planning Keymilestones',
      width: '80vw',
      modal: true,
      closable: true,
      dismissableMask: true
    });
  }
  openGannKey() {
    this.ref = this.dialogService.open(MoGannKeyComponent, {
      header: 'Gann Keymilestones',
      width: '80vw',
      modal: true,
      closable: true,
      dismissableMask: true
    });
  }
  /**termina */

  ngOnInit() {
    this.observaProjectSelected();
    // this.getUserMenu();

    this.Calendar = [
      {
        label: 'Planning milestones',
        icon: 'pi pi-calendar-clock',
        command: () => {
          this.openPlanKey();
        }
      },
      {
        label: 'Diagrama Gannt',
        icon: 'pi pi-clock',
        command: () => {
          this.openGannKey();
        }
      }
    ];


  }

  // getUserMenu(){
  //   this._userService.getUserMenu(this.token).subscribe(resp => {
  //     if(resp.valido === 1){
  //       this.MenuProject = this.formaterSubmenu(resp)
  //       this._authGuardService.setUserMenu(resp.result[0]?.Menus);
  //     }
  //   })
  // }
  observaProjectSelected() {
    this.serviceObsProject$.selectedProject$.subscribe((project: Project) => {
      this.project = project ?? null;
      if (project) {
        this.selectedCountry = this.projects.find(x => x.Id_projects == project.Id_projects);
        this.projectName = project.project_name || '';
      }
    });
  }

  formaterSubmenu(responseMenu: any) {
    this.menus = responseMenu.result[0].Menus.map((menu: any) => ({
      label: menu.label,
      items: (menu.items ?? []).map((sub: any) => ({
        label: sub.label,
        routerLink: sub.routerLink,
        Idsubmenu: sub.Idsubmenu,
        command: () => this.onSubmenuClick(sub, menu.label)
      }))
    }));
    return this.menus;
  }

  onSubmenuClick(subMenu: any, menu: any) {
    this._authGuardService.setCurrentSubmenu(subMenu.Idsubmenu);
    this._authGuardService.setCurrentSubmenuLabels(menu, subMenu.label);

    const token = this._authGuardService.getToken() ?? '';
    this._authGuardService.getPermissionsBySubmenu(subMenu.Idsubmenu, token).subscribe({
      next: (resp: Respuesta) => {
        if (resp.valido === 1) {
          const permisosValidar: string[] = resp.result.map((p: any) => p.short_permission_desc);
          const dataUsuario = this._authGuardService.getPermissions();
          const permissionUsuSub = PermissionUser.filterPermission(menu, subMenu.label, dataUsuario, permisosValidar);
        }
      }
    });
  }

}
