import { Component, OnInit, inject } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION, PRIMENG_LAYOUT } from '../../../shared/imports';
import { forkJoin } from 'rxjs';
import { SelectItemGroup } from 'primeng/api';
import { PermissionUser, SetModulePayload, SetMainMenuPayload, SetSubMenuPayload, StateOption, MenuOption, City, MenuGeneralForm, MenuPortfolioForm, SubMenuForm, Step1Form, Step2Form, Step3Form, ModuleItem, MainMenuItem, SubMenuItem} from '../../../interfaces/tools/menu/menu.interface';
import { Respuesta } from '../../../interfaces/apiResponse.interface';
import { authGuardService } from '../../../../service/authGuard.service';
import { Menuservice } from '../../../../service/tools/Menu/menu.service';
import { RolesService } from '../../../../service/tools/roles/roles.service';
import { MessageService, ConfirmationService } from 'primeng/api';

type ActiveTab = '0' | '1' | '2';

@Component({
  selector: 'app-menus.tls',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION, ...PRIMENG_LAYOUT],
  standalone: true,
  providers: [MessageService, ConfirmationService],
  templateUrl: './menus.tls.component.html',
  styleUrl: './menus.tls.component.scss'
})
export class MenusTlsComponent implements OnInit {
  private _menuService         = inject(Menuservice);
  private _authGuardService    = inject(authGuardService);
  private _messageService      = inject(MessageService);
  private _confirmationService = inject(ConfirmationService);
  private _rolesService        = inject(RolesService);

  token: string = this._authGuardService.getToken() || '';
  visible2: boolean = false;
  visible3: boolean = false;
  activeTab: ActiveTab = '0';
  isSaving: boolean = false;

  modules: ModuleItem[] = [];
  mainMenus: MainMenuItem[] = [];
  subMenus: SubMenuItem[] = [];
  formSubmitted: boolean = false;
  selectedModule: ModuleItem | null = null;
  selectedMainMenu: MainMenuItem | null = null;
  selectedSubMenu: SubMenuItem | null = null;
  state: StateOption[] = [];
  menuOptions: MenuOption[] = [
    { name: 'General Menu' },
    { name: 'Portfolio' }
  ];
  groupedCities: SelectItemGroup[] = [];
  selectedCities: City[] = [];

  menuGeneralForm: MenuGeneralForm = {
    shortDescription: '',
    longDescription: ''
  };

  menuPortfolioForm: MenuPortfolioForm = {
    shortDescription: '',
    longDescription: '',
    order: null,
    moduleIds: []
  };

  permissions: PermissionUser[] = [];

  subMenuForm: SubMenuForm = {
    shortDescription: '',
    longDescription: '',
    route: '',
    order: null,
    mainMenuId: null,
    permissionIds: [] 
  };

  selectedValue: string = '';
  activeStep: string = '0';
  completedSteps: boolean[] = [false, false, false];
  step1: Step1Form = { userType: null, menuType: null };
  step2: Step2Form = { modules: [], role: null };
  step3: Step3Form = { rolType: null, rolName: '' };

  ngOnInit(): void {
    this.loadData();
    this.getPermissions();
  }

  getPermissions(): void {
    this._rolesService.getPermissionsUser(this.token).subscribe({
      next: (response: Respuesta) => {
        if (response.valido === 1) {
          this.permissions = response.result;
        }
      }
    });
  }

  loadData(): void {
    forkJoin({
      modules: this._menuService.getModules(this.token),
      mainMenus: this._menuService.getMainMenu(this.token),
      subMenus: this._menuService.getSubMenu(this.token)
    }).subscribe({
      next: (res: { modules: Respuesta; mainMenus: Respuesta; subMenus: Respuesta }) => {
        this.modules   = res.modules.result   as ModuleItem[];
        this.mainMenus = res.mainMenus.result as MainMenuItem[];
        this.subMenus  = res.subMenus.result  as SubMenuItem[];
      },
      error: (err) => console.error('Error cargando catálogos de menu:', err)
    });
  }

  get drawerTitle(): string {
    const isEdit = this.selectedModule || this.selectedMainMenu || this.selectedSubMenu;
    const action = isEdit ? 'Edit' : 'Create';
    const titles: Record<ActiveTab, string> = {
      '0': `${action} Menu General`,
      '1': `${action} Menu Portfolio`,
      '2': `${action} Sub Menu`
    };
    return titles[this.activeTab];
  }

  openNewMenuDrawer(): void {
    this.formSubmitted = false;
    this.selectedModule   = null;
    this.selectedMainMenu = null;
    this.selectedSubMenu  = null;
    this.resetMenuGeneralForm();
    this.resetMenuPortfolioForm();
    this.resetSubMenuForm();
    this.visible2 = true;
  }


  openEditModule(item: ModuleItem): void {
    this.formSubmitted = false;
    this.selectedModule = item;
    this.menuGeneralForm = {
      shortDescription: item.short_module_dec,
      longDescription:  item.long_module_desc
    };
    this.visible2 = true;
  }

  openEditMainMenu(item: MainMenuItem): void {
    this.formSubmitted = false;
    this.selectedMainMenu = item;

    const relatedNames: string[] = item.related_modules
      .split(',')
      .map((s: string) => s.trim());

    const matchedModules: ModuleItem[] = this.modules.filter((m: ModuleItem) =>
      relatedNames.includes(m.short_module_dec)
    );

    this.menuPortfolioForm = {
      shortDescription: item.short_main_desc,
      longDescription:  item.long_main_desc,
      order:            item.order_index,
      moduleIds:        matchedModules
    };
    this.visible2 = true;
  }

  openEditSubMenu(item: SubMenuItem): void {
    this.formSubmitted = false;
    this.selectedSubMenu = item;

    const permIds: number[] = item.permission_ids
      ? item.permission_ids.split(',').map((id: string) => Number(id.trim()))
      : [];

    this.subMenuForm = {
      shortDescription: item.short_submenu_desc,
      longDescription:  item.long_submenu_desc,
      route:            item.router_link,
      order:            item.order_index,
      mainMenuId:       this.mainMenus.find(m => m.short_main_desc === item.related_main_menus) ?? null,
      permissionIds:    permIds
    };
    this.visible2 = true;
}

  saveMenuGeneral(isDeleted: number = 1): void {
    this.formSubmitted = true;
    if (!this.menuGeneralForm.shortDescription.trim() || !this.menuGeneralForm.longDescription.trim()) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'All fields are required' });
      return;
    }

    if (this.isSaving) return;
    this.isSaving = true;

    // Validación de duplicados 
    const isInsert: boolean = !this.selectedModule;
      if (isInsert) {
        const shortDesc: string = this.menuGeneralForm.shortDescription.trim().toLowerCase();
        const longDesc: string  = this.menuGeneralForm.longDescription.trim().toLowerCase();

        const duplicate: ModuleItem | undefined = this.modules.find((m: ModuleItem) =>
          m.short_module_dec.trim().toLowerCase() === shortDesc ||
          m.long_module_desc.trim().toLowerCase() === longDesc
        );

        if (duplicate) {
          this._messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `A menu general with that description already exists: "${duplicate.short_module_dec}"` });
          this.isSaving = false;
          return;
        }
      }
    const payload: SetModulePayload = {
      p_Idmodule:         this.selectedModule?.Idmodule ?? 0,
      p_short_module_dec: this.menuGeneralForm.shortDescription.trim(),
      p_long_module_desc: this.menuGeneralForm.longDescription.trim(),
      isDeleted
    };

    this._menuService.setModules(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          const detail = isDeleted === 0 ? 'Menu General deleted successfully' : 'Menu General saved successfully';
          this._messageService.add({ severity: 'success', summary: 'Success', detail });
          this.visible2 = false;
          this.resetMenuGeneralForm();
          this.loadData();
        }
      },
      error: (err) => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Menu General' });
        console.error('Error saving Menu General:', err);
      }
    });
  }

  saveMenuPortfolio(isDeleted: number = 1): void {
    this.formSubmitted = true;
    const moduleIds: number[] = this.menuPortfolioForm.moduleIds.map((m: ModuleItem) => m.Idmodule);

    if (!this.menuPortfolioForm.shortDescription.trim() || !this.menuPortfolioForm.longDescription.trim()) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'All fields are required' });
      return;
    }

    const isInsert: boolean = !this.selectedMainMenu;
      if (isInsert) {
        const shortDesc: string = this.menuPortfolioForm.shortDescription.trim().toLowerCase();
        const longDesc: string  = this.menuPortfolioForm.longDescription.trim().toLowerCase();

        const duplicate: MainMenuItem | undefined = this.mainMenus.find((m: MainMenuItem) =>
          m.short_main_desc.trim().toLowerCase() === shortDesc ||
          m.long_main_desc.trim().toLowerCase() === longDesc
        );

        if (duplicate) {
          this._messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `A menu portfolio with that description already exists: "${duplicate.short_main_desc}"` });
          return;
        }
      }
    const payload: SetMainMenuPayload = {
      p_Idmainmenu:      this.selectedMainMenu?.Idmainmenu ?? 0,
      p_short_main_desc: this.menuPortfolioForm.shortDescription.trim(),
      p_long_main_desc:  this.menuPortfolioForm.longDescription.trim(),
      p_Idstatus:        isDeleted,
      p_order_index:     this.menuPortfolioForm.order,
      p_module_ids:      JSON.stringify(moduleIds)
    };

    if (this.isSaving) return;
    this.isSaving = true;

    this._menuService.setMainMenu(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          const detail = isDeleted === 0 ? 'Menu Portfolio deleted successfully' : 'Menu Portfolio saved successfully';
          this._messageService.add({ severity: 'success', summary: 'Success', detail });
          this.visible2 = false;
          this.resetMenuPortfolioForm();
          this.loadData();
        }
      },
      error: (err) => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Menu Portfolio' });
        console.error('Error saving Menu Portfolio:', err);
      }
    });
  }

  saveSubMenu(isDeleted: number = 1): void {
    this.formSubmitted = true;
    if (!this.subMenuForm.shortDescription.trim() || !this.subMenuForm.longDescription.trim() || !this.subMenuForm.route.trim() || !this.subMenuForm.order || !this.subMenuForm.mainMenuId || this.subMenuForm.permissionIds.length === 0) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'All fields are required' });
      return;
    }

    // Validación de duplicados 
    const isInsert: boolean = !this.selectedSubMenu;
      if (isInsert) {
        const shortDesc: string = this.subMenuForm.shortDescription.trim().toLowerCase();
        // const longDesc: string  = this.subMenuForm.longDescription.trim().toLowerCase();
        const route: string     = this.subMenuForm.route.trim().toLowerCase();

        const duplicate: SubMenuItem | undefined = this.subMenus.find((s: SubMenuItem) =>
          s.short_submenu_desc.trim().toLowerCase() === shortDesc ||
          // s.long_submenu_desc.trim().toLowerCase()  === longDesc  ||
          s.router_link.trim().toLowerCase()         === route
        );

        if (duplicate) {
          this._messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `A sub menu with that description or route already exists: "${duplicate.short_submenu_desc}"` });
          return;
        }
      }

    const payload: SetSubMenuPayload = {
      p_Idsubmenu:          this.selectedSubMenu?.Idsubmenu ?? 0,
      p_short_submenu_desc: this.subMenuForm.shortDescription.trim(),
      p_long_submenu_desc:  this.subMenuForm.longDescription.trim(),
      p_router_link:        this.subMenuForm.route.trim(),
      p_Idmainmenu:         this.subMenuForm.mainMenuId?.Idmainmenu ?? null,
      isDeleted,
      p_order_index:        this.subMenuForm.order,
      p_permission_ids:     JSON.stringify(this.subMenuForm.permissionIds)
    };

    if (this.isSaving) return;
    this.isSaving = true;
    
    this._menuService.setSubMenu(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          const detail = isDeleted === 0 ? 'Sub Menu deleted successfully' : 'Sub Menu saved successfully';
          this._messageService.add({ severity: 'success', summary: 'Success', detail });
          this.visible2 = false;
          this.resetSubMenuForm();
          this.loadData();
        }
      },
      error: (err) => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Sub Menu' });
        console.error('Error saving Sub Menu:', err);
      }
    });
  }


  deleteMenuGeneral(): void {
    this._confirmationService.confirm({
      message: `Are you sure you want to delete "${this.selectedModule?.short_module_dec}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.saveMenuGeneral(0)
    });
  }

  deleteMenuPortfolio(): void {
    this._confirmationService.confirm({
      message: `Are you sure you want to delete "${this.selectedMainMenu?.short_main_desc}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.saveMenuPortfolio(2)
    });
  }

  deleteSubMenu(): void {
    this._confirmationService.confirm({
      message: `Are you sure you want to delete "${this.selectedSubMenu?.short_submenu_desc}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.saveSubMenu(0)
    });
  }

  private resetMenuGeneralForm(): void {
    this.menuGeneralForm = { shortDescription: '', longDescription: '' };
  }

  private resetMenuPortfolioForm(): void {
    this.menuPortfolioForm = { shortDescription: '', longDescription: '', order: null, moduleIds: [] };
  }

  private resetSubMenuForm(): void {
    this.subMenuForm = {
      shortDescription: '',
      longDescription: '',
      route: '',
      order: null,
      mainMenuId: null,
      permissionIds: []
    };
  }

  saveStep(step: number): void {
    switch (step) {
      case 1:
        this.completedSteps[0] = true;
        this.activeStep = '1';
        break;
      case 2:
        this.completedSteps[1] = true;
        this.activeStep = '2';
        break;
      case 3:
        this.completedSteps[2] = true;
        this.visible3 = false;
        this.resetSteps();
        break;
    }
  }

  resetSteps(): void {
    this.activeStep = '0';
    this.completedSteps = [false, false, false];
    this.step1 = { userType: null, menuType: null };
    this.step2 = { modules: [], role: null };
    this.step3 = { rolType: null, rolName: '' };
  }
}