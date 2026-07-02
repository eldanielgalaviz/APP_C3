export interface StateOption {
  name: string;
}

export interface MenuOption {
  name: string;
}

export interface City {
  name: string;
  code: string;
}

export interface MenuGeneralForm {
  shortDescription: string;
  longDescription: string;
}

export interface MenuPortfolioForm {
  shortDescription: string;
  longDescription: string;
  order: number | null;
  moduleIds: ModuleItem[];
}

export interface SubMenuForm {
  shortDescription: string;
  longDescription: string;
  route: string;
  order: number | null;
  mainMenuId: MainMenuItem | null;
  permissionIds: number[];        
}

export interface Step1Form {
  userType: StateOption | null;
  menuType: MenuOption | null;
}

export interface Step2Form {
  modules: City[];
  role: StateOption | null;
}

export interface Step3Form {
  rolType: StateOption | null;
  rolName: string;
}

// ─── GET ──────────────────────────────────────────

export interface ModuleItem {
  Idmodule: number;
  short_module_dec: string;
  long_module_desc: string;
  Idstatus: number;
  short_status_desc: string;
}

export interface MainMenuItem {
  Idmainmenu: number;
  short_main_desc: string;
  long_main_desc: string;
  order_index: number;
  related_modules: string;
}

export interface SubMenuItem {
  Idsubmenu: number;
  short_submenu_desc: string;
  long_submenu_desc: string;
  router_link: string;
  order_index: number;
  related_main_menus: string;
  permission_ids: string | null;   
  permission_names: string | null;  
}

// ─── SET ─────────────────────────────────────────────────────────

export interface SetModulePayload {
  p_Idmodule: number;
  p_short_module_dec: string;
  p_long_module_desc: string;
  isDeleted: number;
}

export interface SetMainMenuPayload {
  p_Idmainmenu: number;
  p_short_main_desc: string;
  p_long_main_desc: string;
  p_Idstatus: number;
  p_order_index: number | null;
  p_module_ids: string;
}

export interface SetSubMenuPayload {
  p_Idsubmenu: number;
  p_short_submenu_desc: string;
  p_long_submenu_desc: string;
  p_router_link: string;
  p_Idmainmenu: number | null;
  isDeleted: number;
  p_order_index: number | null;
  p_permission_ids: string;         
}

// ── Catálogo de permisos ───────────────────────────────────────────────────
export interface PermissionUser {
  Idpermissionuser: number;
  short_permission_desc: string;
  long_permission_desc: string;
}
