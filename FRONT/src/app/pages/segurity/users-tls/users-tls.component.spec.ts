import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTlsComponent } from './users-tls.component';

describe('UsersTlsComponent', () => {
  let component: UsersTlsComponent;
  let fixture: ComponentFixture<UsersTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
