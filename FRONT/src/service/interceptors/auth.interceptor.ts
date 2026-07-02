import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { authGuardService } from '../authGuard.service';
import { SessionExpiredService } from '../session-expired.service';
import { PUBLIC_URLS} from './auth.constants';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService    = inject(authGuardService);
  const sessionExpired = inject(SessionExpiredService);
  const router         = inject(Router);

  const isPublic = PUBLIC_URLS.some(url => req.url.includes(url));
  if (isPublic) return next(req);

  if (authService.isTokenExpired()) {
    authService.clearSession();
    sessionExpired.notify();
    return throwError(() => new Error('Token expirado'));
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.clearSession();
        sessionExpired.notify();
      }
      return throwError(() => error);
    })
  );
};