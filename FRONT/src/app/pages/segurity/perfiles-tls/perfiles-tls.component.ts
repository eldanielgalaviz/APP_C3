import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/imports';
import { MessageService, ConfirmationService } from 'primeng/api';
import { authGuardService } from '../../../../service/authGuard.service';
import { RolesService } from '../../../../service/tools/roles/roles.service';
import { Respuesta } from '../../../interfaces/apiResponse.interface';
import {
  RoleItem, RoleForm, SetRolesPayload, Permission,
  UserRoleItem, UserRoleDetail, SetUserRolePayload, UserRoleForm, UserItem
} from '../../../interfaces/tools/roles/roles.interface';
import { forkJoin } from 'rxjs';

type ActiveTab = '0' | '1' ;

@Component({
  selector: 'app-perfiles-tls',
  imports: [SHARED_IMPORTS],
  providers: [MessageService, ConfirmationService],
  standalone: true,
  templateUrl: './perfiles-tls.component.html',
  styleUrl: './perfiles-tls.component.scss'
})
export class PerfilesTlsComponent implements OnInit {

  token: any;
  visible2: boolean = false;
  activeTab: ActiveTab = '0';
  formSubmitted: boolean = false;
  // Agrega la variable
  users: UserItem[] = [];

  // --- TAB 0: Roles ---
  roles: RoleItem[] = [];
  selectedRole: RoleItem | null = null;

  roleForm: RoleForm = {
    shortDescription: '',
    selectedPermissions: []
  };

  permissionsCatalog: Permission[] = [
    { Id: 1, permission: 'VIEW' },
    { Id: 2, permission: 'CREATE' },
    { Id: 3, permission: 'EDIT' },
    { Id: 4, permission: 'DELETE' }
  ];

  // --- TAB 1: User-Role ---
  userRoles: UserRoleItem[] = [];
  selectedUserRole: UserRoleItem | null = null;

  userRoleForm: UserRoleForm = {
    editType: 'role',
    selectedRoles: []
  };

  constructor(
    private _rolesService: RolesService,
    private _authGuardService: authGuardService,
    private _messageService: MessageService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.token = this._authGuardService.getToken();
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      roles:     this._rolesService.getRoles(this.token),
      userRoles: this._rolesService.getUserRoles(this.token),
      users:     this._rolesService.getUsers(this.token)
    }).subscribe({
      next: (res: { roles: Respuesta; userRoles: Respuesta; users: Respuesta }) => {
        this.roles     = res.roles.result     as RoleItem[];
        this.userRoles = res.userRoles.result as UserRoleItem[];
        this.users     = res.users.result     as UserItem[];
      },
      error: (err) => console.error('Error cargando datos:', err)
    });
  }

  get drawerTitle(): string {
    const titles: Record<ActiveTab, string> = {
      '0': this.selectedRole     ? 'Edit Rol-Permission' : 'Create Rol-Permission',
      '1': this.selectedUserRole ? 'Edit Rol-User'       : 'Create Rol-User',
    };
    return titles[this.activeTab];
  }

  openNewDrawer(): void {
    this.formSubmitted    = false;
    this.selectedRole     = null;
    this.selectedUserRole = null;
    this.resetRoleForm();
    this.resetUserRoleForm();
    this.visible2 = true;
  }

  // =====================
  // TAB 0: Role
  // =====================
  openEditRole(item: RoleItem): void {
    this.formSubmitted = false;
    this.selectedRole  = item;

    const matchedPermissions: Permission[] = this.permissionsCatalog.filter((p: Permission) =>
      item.permissions.some((ip: Permission) => ip.Id === p.Id)
    );

    this.roleForm = {
      shortDescription:    item.short_role_desc,
      selectedPermissions: matchedPermissions
    };
    this.visible2 = true;
  }

  private callSetRole(isDeleted: number): void {
    const permissionIds: number[] = this.roleForm.selectedPermissions.map((p: Permission) => p.Id);

    const payload: SetRolesPayload = {
      p_Idrole:          this.selectedRole?.Idrole ?? 0,
      p_short_role_desc: this.roleForm.shortDescription.trim(),
      isDeleted,
      p_permissions:     JSON.stringify(permissionIds)
    };

    this._rolesService.setRoles(payload, this.token).subscribe({
      next: (res: Respuesta) => {
        if (res.valido === 1) {
          const detail = isDeleted === 0 ? 'Role deleted successfully' : 'Role saved successfully';
          this._messageService.add({ severity: 'success', summary: 'Success', detail });
          this.visible2 = false;
          this.resetRoleForm();
          this.loadData();
        }
      },
      error: (err) => {
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
        .map((p: Permission) => p.Id)
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

    this.callSetRole(1);
  }

  deleteRole(): void {
    this._confirmationService.confirm({
      message: `Are you sure you want to delete "${this.selectedRole?.short_role_desc}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.callSetRole(0)
    });
  }

  private resetRoleForm(): void {
    this.roleForm = { shortDescription: '', selectedPermissions: [] };
  }

  // =====================
  // TAB 1: User-Role
  // =====================
  openEditUserRole(item: UserRoleItem): void {
    this.formSubmitted    = false;
    this.selectedUserRole = item;

    const validRoles: UserRoleDetail[] = item.roles.filter(
      (r: UserRoleDetail) => r.Idrole !== null
    );

    this.userRoleForm = {
      editType:     'role',
      selectedRoles: validRoles
    };
    this.visible2 = true;
  }

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

  private resetUserRoleForm(): void {
    this.userRoleForm = { editType: 'role', selectedRoles: [] };
  }
}