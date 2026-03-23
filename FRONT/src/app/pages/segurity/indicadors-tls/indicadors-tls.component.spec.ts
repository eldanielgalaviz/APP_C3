import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorsTlsComponent } from './indicadors-tls.component';

describe('IndicadorsTlsComponent', () => {
  let component: IndicadorsTlsComponent;
  let fixture: ComponentFixture<IndicadorsTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndicadorsTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicadorsTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
