import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubaccountsTlsComponent } from './subaccounts-tls.component';

describe('SubaccountsTlsComponent', () => {
  let component: SubaccountsTlsComponent;
  let fixture: ComponentFixture<SubaccountsTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubaccountsTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubaccountsTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
