export interface Permission {
  Id: number;
  permission: string;
}

export interface RoleItem {
  Idrole: number;
  short_role_desc: string;
  Idstatus: number;
  short_status_desc: string;
  permissions: Permission[];
}

export interface SetRolesPayload {
  p_Idrole: number;
  p_short_role_desc: string;
  isDeleted: number;
  p_permissions: string;
}

export interface RoleForm {
  shortDescription: string;
  selectedPermissions: Permission[];
}


export interface Permission {
  Id: number;
  permission: string;
}

export interface RoleItem {
  Idrole: number;
  short_role_desc: string;
  Idstatus: number;
  short_status_desc: string;
  permissions: Permission[];
}

export interface SetRolesPayload {
  p_Idrole: number;
  p_short_role_desc: string;
  isDeleted: number;
  p_permissions: string;
}

export interface RoleForm {
  shortDescription: string;
  selectedPermissions: Permission[];
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

export interface UserRoleForm {
  editType: 'role' | 'module';
  selectedRoles: UserRoleDetail[];
}

export interface UserItem {
  Iduser: number;
  full_name: string;
  email: string;
}