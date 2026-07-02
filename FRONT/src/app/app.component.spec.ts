import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { authGuardService } from '../service/authGuard.service';

describe('AppComponent', () => {

  let authSpy: jasmine.SpyObj<authGuardService>;

  beforeEach(async () => {

    authSpy = jasmine.createSpyObj(
      'authGuardService',
      [
        'clearSession',
        'getUser'
      ]
    );

    authSpy.clearSession().and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: authGuardService,
          useValue: authSpy
        }
      ]
    }).compileComponents();

  });

  it('should create the app', () => {

    const fixture = TestBed.createComponent(AppComponent);

    const app = fixture.componentInstance;

    expect(app).toBeTruthy();

  });

});