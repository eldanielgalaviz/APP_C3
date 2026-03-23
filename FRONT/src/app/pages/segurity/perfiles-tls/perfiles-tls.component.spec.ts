import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilesTlsComponent } from './perfiles-tls.component';

describe('PerfilesTlsComponent', () => {
  let component: PerfilesTlsComponent;
  let fixture: ComponentFixture<PerfilesTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilesTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilesTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
