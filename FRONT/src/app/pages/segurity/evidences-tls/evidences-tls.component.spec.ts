import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencesTlsComponent } from './evidences-tls.component';

describe('EvidencesTlsComponent', () => {
  let component: EvidencesTlsComponent;
  let fixture: ComponentFixture<EvidencesTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvidencesTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidencesTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
