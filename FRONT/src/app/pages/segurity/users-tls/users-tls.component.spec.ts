import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UsersTlsComponent } from './users-tls.component';
import { usersService } from '../../../../service/tools/users/users.service';

describe('UsersTlsComponent', () => {

  let component: UsersTlsComponent;
  let fixture: ComponentFixture<UsersTlsComponent>;

  let usersServiceSpy: jasmine.SpyObj<usersService>;

  beforeEach(async () => {

    const spy = jasmine.createSpyObj('usersService', [
      'getUsers',
      'saveUser'
    ]);

    await TestBed.configureTestingModule({
      imports: [UsersTlsComponent],
      providers: [
        {
          provide: usersService,
          useValue: spy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTlsComponent);

    component = fixture.componentInstance;

    usersServiceSpy = TestBed.inject(
      usersService
    ) as jasmine.SpyObj<usersService>;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

});