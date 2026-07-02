import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { authGuardService } from "../authGuard.service";

@Injectable({
  providedIn: 'root'
})

export class MenuGuard implements CanActivateChild  {

  constructor(
    private authService: authGuardService,
    private router: Router
  ) {}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    const currentUrl = state.url;

    const allowedRoutes = this.authService.getAllowedRoutes();

    if (!allowedRoutes.length) {
      return this.router.createUrlTree(['/Inicio']);
    }

    const hasAccess = this.authService.hasAccess(currentUrl);

    if (!hasAccess) {
      return this.router.createUrlTree(['/Inicio']);
    }

    return true;
  }

}