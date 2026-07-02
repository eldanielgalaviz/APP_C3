import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authGuardService } from '../service/authGuard.service';
import { Router } from '@angular/router';
import { SessionExpiredService } from '../service/session-expired.service';
import { Subscription } from 'rxjs';
import { PRIMENG_FORM, PRIMENG_OVERLAY } from './shared/imports';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PRIMENG_OVERLAY, PRIMENG_FORM],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'canopia-v2';
  sessionExpiredVisible = false;
  countdown             = 6;

  private sub?: Subscription;
  private timer?: ReturnType<typeof setInterval>;

  constructor(
    private _authGuardService: authGuardService,
    private sessionExpiredService: SessionExpiredService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
    const tabActive = sessionStorage.getItem('tabActive');
    this.sub = this.sessionExpiredService.trigger$.subscribe(() => {
      this.showExpiredModal();
    });
    if (!tabActive && !isReload) {
      sessionStorage.clear();
    }

    sessionStorage.setItem('tabActive', 'true');
  }

    private showExpiredModal(): void {
    if (this.sessionExpiredVisible) return; 
    this.sessionExpiredVisible = true;
    this.countdown = 5;

    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.redirectToLogin();
      }
    }, 1000);
  }

  redirectToLogin(): void {
    clearInterval(this.timer);
    this.sessionExpiredVisible = false;
    this.router.navigate(['/'], { replaceUrl: true });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    clearInterval(this.timer);
  }
}