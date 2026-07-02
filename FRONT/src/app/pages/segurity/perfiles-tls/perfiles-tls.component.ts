import { Component, inject, OnInit } from '@angular/core';
import { CORE_IMPORTS, PRIMENG_FORM, PRIMENG_DATA, PRIMENG_OVERLAY, PRIMENG_NAVIGATION, PRIMENG_LAYOUT } from '../../../shared/imports';
import { MessageService, ConfirmationService } from 'primeng/api';
import { authGuardService } from '../../../../service/authGuard.service';
import { RolesService } from '../../../../service/tools/roles/roles.service';
import { Menuservice } from '../../../../service/tools/Menu/menu.service';
import { Respuesta } from '../../../interfaces/apiResponse.interface';
import {
  RoleItem, RoleForm, SetRolesPayload, Permission,
  UserRoleDetail, SetUserRolePayload, UserRoleForm, UserItem,
  PermissionUserItem, SetPermissionUserPayload, PermissionUserForm,
  UserModuleItem, UserModuleRoleDetail, UserModuleDetail,
  SetUserModulePayload
} from '../../../interfaces/tools/roles/roles.interface';
import { forkJoin, Observable } from 'rxjs';
import { ModuleItem } from '../../../interfaces/tools/menu/menu.interface';

type ActiveTab = '0' | '1';

@Component({
  selector: 'app-perfiles-tls',
  imports: [...CORE_IMPORTS, ...PRIMENG_FORM, ...PRIMENG_DATA, ...PRIMENG_OVERLAY, ...PRIMENG_NAVIGATION, ...PRIMENG_LAYOUT],
  providers: [MessageService, ConfirmationService],
  standalone: true,
  templateUrl: './perfiles-tls.component.html',
  styleUrl: './perfiles-tls.component.scss'
})
export class PerfilesTlsComponent implements OnInit {

  private _rolesService        = inject(RolesService);
  private _authGuardService    = inject(authGuardService);
  private _messageService      = inject(MessageService);
  private _confirmationService = inject(ConfirmationService);
  private _menuService         = inject(Menuservice);

  token: string = this._authGuardService.getToken() || '';

  /** Estado UI */
  visible2: boolean          = false;
  visible3: boolean          = false;
  visible4: boolean          = false;
  activeTab: ActiveTab       = '0';
  formSubmitted: boolean     = false;
  isSaving: boolean          = false;
  isSavingRole: boolean      = false;
  isSavingRelation: boolean  = false;

  users: UserItem[]     = [];
  modules: ModuleItem[] = [];

  /** TAB 0: Roles */
  roles: RoleItem[]            = [];
  selectedRole: RoleItem | null = null;
  roleForm: RoleForm = { shortDescription: '', selectedPermissions: [] };

  /** TAB 1: User-Role */
  userRolesMenus: UserModuleItem[]            = [];
  selectedUserRole: UserModuleItem | null      = null;
  filterModuleIds: number[]                    = [];
  userRoleForm: UserRoleForm = { editType: 'role', selectedRoles: [] };

  /** Permission User (drawer visible3) */
  permissionsUser: PermissionUserItem[]             = [];
  selectedPermissionUser: PermissionUserItem | null  = null;
  permissionUserFormSubmitted: boolean               = false;

  /** Relation User-Role (drawer visible4) */
  selectedUserIdForRelation: number | null  = null;
  selectedRolesForRelation: number[]        = [];
  selectedModulesForRelation: number[]      = [];
  relationFormSubmitted: boolean            = false;

  statusCatalog: { Idstatus: number; short_status_desc: string }[] = [
    { Idstatus: 1, short_status_desc: 'Active' },
    { Idstatus: 2, short_status_desc: 'Inactive' },
  ];

  permissionUserForm: PermissionUserForm = {
    short_permission_desc: '',
    long_permission_desc:  '',
    Idstatus:              null
  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      roles:           this._rolesService.getRoles(this.token),
      userRolesMenus:  this._rolesService.getUserModuleRol(this.token),
      users:           this._rolesService.getUsers(this.token),
      permissionsUser: this._rolesService.getPermissionsUser(this.token),
      modules:         this._menuService.getModules(this.token),
    }).subscribe({
      next: (res) => {
        this.roles           = res.roles.result           as RoleItem[];
        this.userRolesMenus  = res.userRolesMenus.result  as UserModuleItem[];
        this.users           = res.users.result           as UserItem[];
        this.permissionsUser = res.permissionsUser.result as PermissionUserItem[];
        this.modules         = res.modules.result         as ModuleItem[];
      },
      error: (err) => console.error('Error cargando datos:', err)
    });
  }

  get usersWithFullName(): (UserItem & { full_name_display: string })[] {
    return this.users.map((u: UserItem) => ({
      ...u,
      full_name_display: `${u.Name} ${u.AP} ${u.AM ?? ''}`.trim()
    }));
  }

  get drawerTitle(): string {
    const titles: Record<ActiveTab, string> = {
      '0': this.selectedRole     ? 'Edit Rol-Permission' : 'Create Rol-Permission',
      '1': this.selectedUserRole ? 'Edit Rol-User'       : 'Create Rol-User',
    };
    return titles[this.activeTab];
  }

  get permissionDrawerTitle(): string {
    return this.selectedPermissionUser ? 'Edit Permission' : 'New Permission';
  }

  get filteredUserRolesMenus(): UserModuleItem[] {
    if (!this.filterModuleIds.length) return this.userRolesMenus;
    return this.userRolesMenus.filter((u: UserModuleItem) =>
      this.filterModuleIds.every((id: number) =>
        u.modules?.some((m: UserModuleDetail) => m.Idmodule === id)
      )
    );
  }

  onModuleFilterChange(): void {}

  onSelectUser(event: { value: number }): void {
    const payload: SetUserRolePayload = {
      p_Iduser:   event.value,
      p_Idrole:   this.userRoleForm.selectedRoles[0]?.Idrole ?? 0,
      p_Idstatus: 1
    };
  }

  // =====================
  // Drawers open/reset
  // =====================
  openNewDrawer(): void {
    this.formSubmitted    = false;
    this.isSavingRole     = false;
    this.selectedRole     = null;
    this.selectedUserRole = null;
    this.resetRoleForm();
    this.resetUserRoleForm();
    this.visible2 = true;
  }

  openNewPermissionDrawer(): void {
    this.permissionUserFormSubmitted = false;
    this.selectedPermissionUser      = null;
    this.resetPermissionUserForm();
    this.visible3 = true;
  }

  openRelationUserRolDrawer(): void {
    this.relationFormSubmitted      = false;
    this.selectedUserIdForRelation  = null;
    this.selectedRolesForRelation   = [];
    this.selectedModulesForRelation = [];
    this.visible4 = true;
  }

  openEditRole(item: RoleItem): void {
    this.formSubmitted = false;
    this.selectedRole  = item;
    const matchedPermissions: PermissionUserItem[] = this.permissionsUser.filter((p: PermissionUserItem) =>
      item.permissions.some((ip: Permission) => ip.Id === p.Idpermissionuser)
    );
    this.roleForm = { shortDescription: item.short_role_desc, selectedPermissions: matchedPermissions };
    this.visible2 = true;
  }

  openEditUserRole(item: UserModuleItem): void {
    this.relationFormSubmitted      = false;
    this.selectedUserIdForRelation  = item.Iduser;
    this.selectedRolesForRelation   = item.roles
      .filter((r: UserModuleRoleDetail) => r.Idrole !== null)
      .map((r: UserModuleRoleDetail) => r.Idrole);
    this.selectedModulesForRelation = item.modules
      .filter((m: UserModuleDetail) => m.Idmodule !== null)
      .map((m: UserModuleDetail) => m.Idmodule);
    this.visible4 = true;
  }

  onSelectExistingPermission(event: { value: PermissionUserItem }): void {
    const item: PermissionUserItem = event.value;
    this.permissionUserFormSubmitted = false;
    this.permissionUserForm = {
      short_permission_desc: item.short_permission_desc,
      long_permission_desc:  item.long_permission_desc ?? '',
      Idstatus:              item.Idstatus
    };
  }

  // =====================
  // TAB 0: Role
  // =====================
  private callSetRole(isDeleted: number): void {
    const permissionIds: number[] = this.roleForm.selectedPermissions.map((p: PermissionUserItem) => p.Idpermissionuser);
    const payload: SetRolesPayload = {
      p_Idrole:          this.selectedRole?.Idrole ?? 0,
      p_short_role_desc: this.roleForm.shortDescription.trim(),
      isDeleted,
      p_permissions:     JSON.stringify(permissionIds)
    };

    this._rolesService.setRoles(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSavingRole = false;
        if (res.valido === 1) {
          const detail: string = isDeleted === 0 ? 'Role deleted successfully' : 'Role saved successfully';
          this._messageService.add({ severity: 'success', summary: 'Success', detail });
          this.visible2 = false;
          this.resetRoleForm();
          this.loadData();
        }
      },
      error: (err) => {
        this.isSavingRole = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save Role' });
        console.error('Error saving Role:', err);
      }
    });
  }

  saveRole(): void {
    this.formSubmitted = true;

    if (!this.roleForm.shortDescription.trim()) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'All fields are required' });
      return;
    }

    if (!this.roleForm.selectedPermissions.length) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Select at least one permission' });
      return;
    }

    const isInsert: boolean = !this.selectedRole;
    if (isInsert) {
      const shortDesc: string = this.roleForm.shortDescription.trim().toLowerCase();
      const duplicateName: RoleItem | undefined = this.roles.find((r: RoleItem) =>
        r.short_role_desc.trim().toLowerCase() === shortDesc
      );
      if (duplicateName) {
        this._messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `A role with that name already exists: "${duplicateName.short_role_desc}"` });
        return;
      }

      const selectedIds: number[] = this.roleForm.selectedPermissions
        .map((p: PermissionUserItem) => p.Idpermissionuser)
        .sort((a: number, b: number) => a - b);

      const duplicatePerms: RoleItem | undefined = this.roles.find((r: RoleItem) => {
        const existingIds: number[] = r.permissions
          .filter((p: Permission) => p.Id !== null)
          .map((p: Permission) => p.Id)
          .sort((a: number, b: number) => a - b);
        return existingIds.length === selectedIds.length &&
               existingIds.every((id: number, i: number) => id === selectedIds[i]);
      });

      if (duplicatePerms) {
        this._messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `A role with the same permissions already exists: "${duplicatePerms.short_role_desc}"` });
        return;
      }
    }

    if (this.isSavingRole) return;
    this.isSavingRole = true;
    this.callSetRole(1);
  }

  deleteRole(): void {
    const isActive: boolean   = this.selectedRole?.Idstatus === 1;
    const action: string      = isActive ? 'deactivate' : 'activate';
    const newStatus: number   = isActive ? 0 : 1;
    this._confirmationService.confirm({
      message: `Are you sure you want to ${action} "${this.selectedRole?.short_role_desc}"?`,
      header:  `Confirm ${action.charAt(0).toUpperCase() + action.slice(1)}`,
      icon:    'pi pi-exclamation-triangle',
      accept:  () => this.callSetRole(newStatus)
    });
  }

  private resetRoleForm(): void {
    this.roleForm = { shortDescription: '', selectedPermissions: [] };
  }

  // =====================
  // TAB 1: User-Role
  // =====================
  saveUserRole(): void {
    this.formSubmitted = true;
    if (!this.userRoleForm.selectedRoles.length) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Select at least one role' });
      return;
    }

    const calls = this.userRoleForm.selectedRoles.map((r: UserRoleDetail) => {
      const payload: SetUserRolePayload = {
        p_Iduser:   this.selectedUserRole!.Iduser,
        p_Idrole:   r.Idrole!,
        p_Idstatus: 1
      };
      return this._rolesService.setUserRoles(payload, this.token);
    });

    forkJoin(calls).subscribe({
      next: () => {
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'User roles saved successfully' });
        this.visible2 = false;
        this.resetUserRoleForm();
        this.loadData();
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save user roles' });
        console.error('Error saving user roles:', err);
      }
    });
  }

  saveUserRoleRelation(): void {
    this.relationFormSubmitted = true;

    if (!this.selectedUserIdForRelation) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'User is required' });
      return;
    }

    if (!this.selectedRolesForRelation.length) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'At least one role is required' });
      return;
    }

    const currentUserRoles: UserModuleItem | undefined = this.userRolesMenus.find(
      (u: UserModuleItem) => u.Iduser === this.selectedUserIdForRelation
    );
    const existingRoleIds: number[] = currentUserRoles
      ? currentUserRoles.roles
          .filter((r: UserModuleRoleDetail) => r.Idrole !== null)
          .map((r: UserModuleRoleDetail) => r.Idrole)
      : [];

    const calls: Observable<Respuesta>[] = [];

    existingRoleIds.forEach((roleId: number) => {
      if (!this.selectedRolesForRelation.includes(roleId)) {
        calls.push(this._rolesService.setUserRoles({ p_Iduser: this.selectedUserIdForRelation!, p_Idrole: roleId, p_Idstatus: 2 }, this.token));
      }
    });

    this.selectedRolesForRelation.forEach((roleId: number) => {
      calls.push(this._rolesService.setUserRoles({ p_Iduser: this.selectedUserIdForRelation!, p_Idrole: roleId, p_Idstatus: 1 }, this.token));
    });

    const modulePayload: SetUserModulePayload = {
      p_Iduser:   this.selectedUserIdForRelation!,
      p_Idmodule: JSON.stringify(this.selectedModulesForRelation)
    };
    calls.push(this._rolesService.setUserModule(modulePayload, this.token));

    if (this.isSavingRelation) return;
    this.isSavingRelation = true;

    forkJoin(calls).subscribe({
      next: () => {
        this.isSavingRelation = false;
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'User-Role saved successfully' });
        this.visible4               = false;
        this.selectedUserIdForRelation  = null;
        this.selectedRolesForRelation   = [];
        this.selectedModulesForRelation = [];
        this.loadData();
      },
      error: (err) => {
        this.isSavingRelation = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save user-role' });
        console.error('Error saving user-role:', err);
      }
    });
  }

  savePermissionUser(): void {
    this.permissionUserFormSubmitted = true;

    if (!this.permissionUserForm.short_permission_desc.trim()) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Permission name is required' });
      return;
    }

    if (!this.permissionUserForm.Idstatus) {
      this._messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Status is required' });
      return;
    }

    const isInsert: boolean = !this.selectedPermissionUser;
    if (isInsert) {
      const shortDesc: string = this.permissionUserForm.short_permission_desc.trim().toLowerCase();
      const duplicate: PermissionUserItem | undefined = this.permissionsUser.find(
        (p: PermissionUserItem) => p.short_permission_desc.trim().toLowerCase() === shortDesc
      );
      if (duplicate) {
        this.isSaving = false;
        this._messageService.add({ severity: 'warn', summary: 'Duplicate', detail: `A permission with that name already exists: "${duplicate.short_permission_desc}"` });
        return;
      }
    }

    if (this.isSaving) return;
    this.isSaving = true;

    const payload: SetPermissionUserPayload = {
      p_Idpermissionuser:      this.selectedPermissionUser?.Idpermissionuser ?? 0,
      p_short_permission_desc: this.permissionUserForm.short_permission_desc.trim(),
      p_long_permission_desc:  this.permissionUserForm.long_permission_desc.trim() || null,
      p_Idstatus:              this.permissionUserForm.Idstatus!
    };

    this._rolesService.setPermissionsUser(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        this.isSaving = false;
        if (res.valido === 1) {
          const detail: string = this.selectedPermissionUser ? 'Permission updated successfully' : 'Permission created successfully';
          this._messageService.add({ severity: 'success', summary: 'Success', detail });
          this.visible3 = false;
          this.resetPermissionUserForm();
          this.loadData();
        } else {
          this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save permission' });
        }
      },
      error: (err) => {
        this.isSaving = false;
        this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save permission' });
        console.error('Error saving permission:', err);
      }
    });
  }

  private resetUserRoleForm(): void {
    this.userRoleForm = { editType: 'role', selectedRoles: [] };
  }

  private resetPermissionUserForm(): void {
    this.permissionUserForm = { short_permission_desc: '', long_permission_desc: '', Idstatus: null };
  }
}