import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { authGuardService } from '../service/authGuard.service';
import { Respuesta } from '../app/interfaces/apiResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class PermissionUser {

  constructor(
    private _authGuardService: authGuardService,
    private _router: Router
  ) {}


    // Lee la URL actual y extrae menu y submenu
   
    private getMenuFromUrl(): { menu: string; submenu: string } {
        // Primero intenta con los labels guardados al hacer clic
        const menuLabel    = this._authGuardService.getCurrentMenuLabel();
        const submenuLabel = this._authGuardService.getCurrentSubLabel();

        if (menuLabel && submenuLabel) {
            return { menu: menuLabel, submenu: submenuLabel };
        }

        // Fallback: busca por router_link en dataUsuario (permisos del usuario)
        const currentUrl   = this._router.url;
        const dataUsuario  = this._authGuardService.getPermissions();

        for (const modulo of dataUsuario) {
            for (const mainMenuObj of modulo.main_menus) {
            const subFound = (mainMenuObj.submenus ?? []).find(
                (sub: any) => sub.router_link === currentUrl
            );
            if (subFound) {
                return {
                menu:    mainMenuObj.main_menu.short_name,
                submenu: subFound.short_name
                };
            }
            }
        }

        return { menu: '', submenu: '' };
    }

    // Filtra los permisos del usuario para un menu/submenu dado
    static filterPermission(
        menuSeleccionado: string,
        submenuSeleccionado: string,
        dataUsuario: any,
        permisosValidar: string[]
        ): string[] {

        // DEBUG
        const todosLosMainMenus = dataUsuario?.flatMap((modulo: any) => modulo.main_menus);
        const menuEncontrado = todosLosMainMenus?.find((m: any) => m.main_menu.short_name === menuSeleccionado);
        const subEncontrado = menuEncontrado?.submenus?.find((s: any) => s.short_name === submenuSeleccionado);

        const permisosAsignados: string[] = [
            ...new Set<string>(
            subEncontrado?.permissions?.filter((p: any) => permisosValidar.includes(p)) ?? []
            )
        ];

        return permisosAsignados;
    }

    // Valida un permiso específico
    static hasPermission(
        dataUsuario: any,
        menuSeleccionado: string,
        submenuSeleccionado: string,
        permisoValidar: string
    ): boolean {
        const permisos = PermissionUser.filterPermission(
        menuSeleccionado,
        submenuSeleccionado,
        dataUsuario,
        [permisoValidar]
        );
        return permisos.includes(permisoValidar);
    }

    //   Función principal: obtiene permisos del submenu ,
    //   los cruza con los permisos del usuario desde authGuard,
    //   y devuelve true/false para cada permiso

    formatData(idSubmenu?: number): Observable<Record<string, boolean>> {
        const token       = this._authGuardService.getToken() ?? '';
        const dataUsuario = this._authGuardService.getPermissions();
        const { menu, submenu } = this.getMenuFromUrl();

        // Si no viene idSubmenu o es 0, lo busca por la URL actual
        const resolvedId = idSubmenu || 
            this._authGuardService.getCurrentSubmenu() || 
            this._authGuardService.getSubmenuIdByRoute(this._router.url);

        if (!resolvedId) {
            return new Observable(observer => {
            observer.next({});
            observer.complete();
            });
        }

        return this._authGuardService
            .getPermissionsBySubmenu(resolvedId, token)
            .pipe(
            map((resp: Respuesta) => {
                const permisosDelSubmenu: string[] = resp.valido === 1
                ? resp.result.map((p: any) => p.short_permission_desc)
                : [];

                const permisosDelUsuario: string[] = PermissionUser.filterPermission(
                menu,
                submenu,
                dataUsuario,
                permisosDelSubmenu
                );

                const resultado: Record<string, boolean> = {};
                permisosDelSubmenu.forEach((permiso: string) => {
                resultado[permiso] = permisosDelUsuario.includes(permiso);
                });

                return resultado;
            })
        );
    }

}