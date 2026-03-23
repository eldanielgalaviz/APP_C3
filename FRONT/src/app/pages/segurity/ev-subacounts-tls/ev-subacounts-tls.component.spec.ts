import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvSubacountsTlsComponent } from './ev-subacounts-tls.component';

describe('EvSubacountsTlsComponent', () => {
  let component: EvSubacountsTlsComponent;
  let fixture: ComponentFixture<EvSubacountsTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvSubacountsTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvSubacountsTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
