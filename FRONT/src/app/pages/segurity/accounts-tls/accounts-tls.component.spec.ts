import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsTlsComponent } from './accounts-tls.component';

describe('AccountsTlsComponent', () => {
  let component: AccountsTlsComponent;
  let fixture: ComponentFixture<AccountsTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountsTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
