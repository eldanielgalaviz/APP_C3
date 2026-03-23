import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvSettlementTlsComponent } from './ev-settlement-tls.component';

describe('EvSettlementTlsComponent', () => {
  let component: EvSettlementTlsComponent;
  let fixture: ComponentFixture<EvSettlementTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvSettlementTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvSettlementTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
