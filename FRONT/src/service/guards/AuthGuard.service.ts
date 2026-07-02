import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { authGuardService } from '../authGuard.service';
import { JwtPayload } from '../../app/interfaces/auth/JwtPayload.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: authGuardService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLogged = this.auth.isLoggedIn();
    const isExpired = this.auth.isTokenExpired();
    console.log('AuthGuard: isLoggedIn =', isLogged, ', isTokenExpired =', isExpired);
    const currentUrl = state.url;

    // Si el token expiro -> limpiar sesion y redirigir al login
    if (isLogged && isExpired) {
      this.auth.clearSession();
      this.router.navigate(['/'], { replaceUrl: true });
      return false;
    }

    // 🧭 Si usuario está logueado y trata de ir al login (/), redirigir a /inicio
    if (currentUrl === '/' && isLogged) {
      this.router.navigate(['/Inicio'], { replaceUrl: true });
      return false;
    }

    // 🔐 Si NO está logueado y quiere acceder a cualquier ruta distinta del login (/), redirigir a /
    if (currentUrl !== '/' && !isLogged) {
      this.router.navigate(['/'], { replaceUrl: true });
      return false;
    }

    return true;
  }
}
