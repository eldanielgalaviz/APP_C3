import { AppMenuGroup, AppMenuItem, MenuModule, Permission } from "../app/interfaces/menu/Menu.interface";

export function buildMenuMap(permissions: any[]): Map<MenuModule, AppMenuGroup[]> {
  const menuMap = new Map<MenuModule, AppMenuGroup[]>();
  for (const perm of permissions) {
    const moduleName = perm.module?.long_name as string;
    // Si el módulo no está en el enum, se omite
    if (!Object.values(MenuModule).includes(moduleName as MenuModule)) {
      continue;
    }
    const moduleKey = moduleName as MenuModule;
    const groups: AppMenuGroup[] = [];
    for (const mainMenu of perm.main_menus ?? []) {
      const items: AppMenuItem[] = (mainMenu.submenus ?? [])
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((sub: any): AppMenuItem => ({
          label:       sub.short_name,
          routerLink:  sub.router_link,
          permissions: sub.permissions as Permission[],
        }));
      groups.push({
        label: mainMenu.main_menu.short_name,
        items,
      });
    }
    const existing = menuMap.get(moduleKey);
    menuMap.set(moduleKey, existing ? [...existing, ...groups] : groups);
  }
  return menuMap;
}