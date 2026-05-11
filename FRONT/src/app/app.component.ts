import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authGuardService } from '../service/authGuard.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'canopia-v2';
    constructor(private _authGuardService: authGuardService) {}

  ngOnInit() {
    const tabActive = sessionStorage.getItem('tabActive');

    if (!tabActive) {
      this._authGuardService.clearSession();
    }

    sessionStorage.setItem('tabActive', 'true');
  }
}
