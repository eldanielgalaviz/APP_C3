import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SopTlsComponent } from './sop-tls.component';

describe('SopTlsComponent', () => {
  let component: SopTlsComponent;
  let fixture: ComponentFixture<SopTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SopTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SopTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
