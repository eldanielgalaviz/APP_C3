export enum MenuModule {
  PROJECTS  = 'PROJECTS',
  CORPORATE = 'CORPORATE',
  TOOLS = 'TOOLS',
}

export type Permission = 'CREATE' | 'EDIT' | 'DELETE' | 'VIEW';
 
export interface AppMenuItem {
  label:       string;
  routerLink?: string;
  icon?:       string;
  permissions: Permission[];
}
 
export interface AppMenuGroup {
  label: string;
  items: AppMenuItem[];
}