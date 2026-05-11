import { Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authGuardService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  private readonly USER_MENUS = 'user_menus';

  private menus: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

  }
 
  // TOKEN
  setToken(token: string): void {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token)
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY) ?? 'null'
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  // USER
  setUser(user: string): void {
    if(isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }

  }

  getUser(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem(this.USER_KEY) ?? 'null');
    }
    return null;
  }

  // PROJECT
  getProject(){
  if(isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('selectedOption');
    }
    return null;
  }

  clearAll(): void {
    localStorage.clear();
    this.userPermissions = [];
  }

  // PERSMISSIONS
  private userPermissions: any[] = [];

  setPermissions(perms: any[]) {
    this.userPermissions = perms;
    localStorage.setItem('permissions', JSON.stringify(perms));
  }

  getPermissions() {
    if (!this.userPermissions.length) {
      const stored = localStorage.getItem('permissions');
      this.userPermissions = stored ? JSON.parse(stored) : [];
    }
    return this.userPermissions;
  }

  getModulePermissions(route: string): string[] {
    const perms = this.getPermissions();
    const module = perms.find((p: any) => route.includes(p.routerLink));
    return module ? module.permissions : [];
  }

  hasPermission(route: string, permission: string): boolean {
    const modulePerms = this.getModulePermissions(route);
    return modulePerms.includes(permission);
  }

  // USER MENU
  setUserMenu(modules: any[]) {
    this.menus = modules;
    localStorage.setItem(this.USER_MENUS, JSON.stringify(modules));
  }

  getAllowedRoutes(): string[] {
    const routes: string[] = [];

    this.menus.forEach(menu => {
      menu.items?.forEach((item: any) => {
        if (item.routerLink) {
          routes.push(item.routerLink);
        }
      });
    });

    return routes;
  }

  hasAccess(url: string): boolean {
    const allowedRoutes = this.getAllowedRoutes();

    return allowedRoutes.some(route => {
      return url === route || url.startsWith(route + '/');
    });
  }
  
  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('permissions');
    localStorage.removeItem(this.USER_MENUS);
    this.userPermissions = [];
  }
}
