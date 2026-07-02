import { Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { UtilApiService } from './UtilApi.service';
import { Observable } from 'rxjs';
import { Respuesta } from '../app/interfaces/apiResponse.interface';
import { environment } from '../environments/environments';
import { LoggedUser } from '../app/interfaces/auth/LoggedUser.interface';
import { JwtPayload } from '../app/interfaces/auth/JwtPayload.interface';
import { ObservableService } from './observable/Observable.service';

@Injectable({
  providedIn: 'root'
})
export class authGuardService {
  private readonly TOKEN_KEY       = 'token';
  private readonly USER_KEY        = 'user';
  private readonly USER_MENUS      = 'user_menus';
  private readonly PERMISSIONS_KEY = 'permissions';

  private userPermissions: any[] = [];
  private menus: any[]           = [];

  ApiUrl: string = environment.url + 'api/';

  private currentMenuLabel:  string = '';
  private currentSubLabel:   string = '';
  private currentIdSubmenu:  number = 0;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _apiService: UtilApiService,
    private _observableService: ObservableService
  ) {}
  // TOKEN
  setToken(token: string): void {
    if(isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!sessionStorage.getItem(this.TOKEN_KEY);
    }
    return false;
  }

  // Decodifica el payload del JWT sin verificar firma
  private decodeTokenPayload(token: string): JwtPayload | null {
    try {
      const base64Payload = token.split('.')[1];
      const decoded = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }

  // true si el token expiro o no se puede leer
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const payload = this.decodeTokenPayload(token);
    if (!payload?.exp) return true;
    return Date.now() >= payload.exp * 1000;
  }

  // USER
  setUser(user: LoggedUser): void {
    if(isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

  }

  getUser(): LoggedUser | null {
    if (isPlatformBrowser(this.platformId)) {
      const stored = sessionStorage.getItem(this.USER_KEY);
      return stored ? JSON.parse(stored) as LoggedUser : null;
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

  // PERSMISSIONS
  setPermissions(perms: any[]): void {
    this.userPermissions = perms;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.PERMISSIONS_KEY, JSON.stringify(perms));
    }
  }

  getPermissions(): any[] {
    if (!this.userPermissions.length && isPlatformBrowser(this.platformId)) {
      const stored = sessionStorage.getItem(this.PERMISSIONS_KEY);
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
    return this.getModulePermissions(route).includes(permission);
  }

  // USER MENU
  setUserMenu(modules: any[]): void {
    this.menus = modules;
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(this.USER_MENUS, JSON.stringify(modules));
    }
  }

  getAllowedRoutes(): string[] {
    const routes: string[] = [];

    this.menus.forEach(menu => {
      menu.items?.forEach((item: any) => {
        if (item.routerLink) routes.push(item.routerLink);
      });
    });

    return routes;
  }

  hasAccess(url: string): boolean {
    return this.getAllowedRoutes().some(
      route => url === route || url.startsWith(route + '/')
    );
  }
  
  clearSession(): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.USER_KEY);
      sessionStorage.removeItem(this.PERMISSIONS_KEY);
      sessionStorage.removeItem(this.USER_MENUS);
      sessionStorage.removeItem('selectedOption');
      sessionStorage.removeItem('currentIdSubmenu');
      sessionStorage.removeItem('currentMenuLabel');
      sessionStorage.removeItem('currentSubLabel');
    }
    this.userPermissions = [];
    this.menus           = [];
    this._observableService.resetProject();
  }

  setCurrentSubmenu(id: number): void {
    this.currentIdSubmenu = id;
    sessionStorage.setItem('currentIdSubmenu', String(id));
  }

  getCurrentSubmenu(): number {
    if (this.currentIdSubmenu) return this.currentIdSubmenu;
    return Number(sessionStorage.getItem('currentIdSubmenu') ?? 0);
  }

  setCurrentSubmenuLabels(menu: string, sub: string): void {
    this.currentMenuLabel = menu;
    this.currentSubLabel  = sub;
    sessionStorage.setItem('currentMenuLabel', menu);
    sessionStorage.setItem('currentSubLabel', sub);
  }

  getCurrentMenuLabel(): string {
    return this.currentMenuLabel || sessionStorage.getItem('currentMenuLabel') || '';
  }

  getCurrentSubLabel(): string {
    return this.currentSubLabel || sessionStorage.getItem('currentSubLabel') || '';
  }

  getSubmenuIdByRoute(route: string): number {
    if (!isPlatformBrowser(this.platformId)) return 0;
    const stored = sessionStorage.getItem(this.USER_MENUS);
    if (!stored) return 0;

    const menus: any[] = JSON.parse(stored);
    for (const menu of menus) {
      const found = (menu.items ?? []).find((item: any) => item.routerLink === route);
      if (found) return found.Idsubmenu;
    }
    return 0;
  }

  getPermissionsBySubmenu(idSubmenu: number, token: string): Observable<Respuesta> {
    return this._apiService.sendGetRequest(`${this.ApiUrl}permissionssub/getPermissions/${idSubmenu}`, token);
  }
}