// --- Permissions ---
export interface Permission {
  Id: number;
  permission: string;
}

// --- TAB 0: Roles ---
export interface RoleItem {
  Idrole: number;
  short_role_desc: string;
  Idstatus: number;
  short_status_desc: string;
  permissions: Permission[];
}

export interface RoleForm {
  shortDescription: string;
  selectedPermissions: PermissionUserItem[];
}

export interface SetRolesPayload {
  p_Idrole: number;
  p_short_role_desc: string;
  isDeleted: number;
  p_permissions: string;
}

// --- TAB 1: User-Role ---
export interface UserRoleItem {
  Iduser: number;
  full_name: string;
  short_status_desc: string | null;
  roles: UserRoleDetail[];
}

export interface UserRoleDetail {
  Idrole: number | null;
  role_desc: string | null;
}

export interface SetUserRolePayload {
  p_Iduser: number;
  p_Idrole: number;
  p_Idstatus: number;
}

export interface SetUserModulePayload {
  p_Iduser: number;
  p_Idmodule: string;
}

export interface UserRoleForm {
  editType: 'role' | 'module';
  selectedRoles: UserRoleDetail[];
}


export interface UserItem {
    Iduser: number;
    Name: string;
    AP: string;
    AM: string | null;
    Email: string;
    full_name?: string;
}

// --- Permission User ---
export interface PermissionUserItem {
  Idpermissionuser: number;
  short_permission_desc: string;
  long_permission_desc: string | null;
  Idstatus: number;
  short_status_desc: string;
  user_create: number;
  user_modify: number | null;
  date_create: string;
  date_modify: string | null;
}

export interface SetPermissionUserPayload {
  p_Idpermissionuser: number;
  p_short_permission_desc: string;
  p_long_permission_desc: string | null;
  p_Idstatus: number;
}

export interface PermissionUserForm {
  short_permission_desc: string;
  long_permission_desc: string;
  Idstatus: number | null;
}

// --- TAB 1: User-Module  ---
export interface UserModuleRoleDetail {
  Idrole: number;
  short_role_desc: string;
}

export interface UserModuleDetail {
  Idmodule: number;
  short_module_dec: string;
}

export interface UserModuleItem {
  Iduser: number;
  FullName: string;
  Status: string;
  roles: UserModuleRoleDetail[];
  modules: UserModuleDetail[];
}