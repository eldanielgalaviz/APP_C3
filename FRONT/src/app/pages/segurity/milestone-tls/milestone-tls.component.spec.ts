import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneTlsComponent } from './milestone-tls.component';

describe('MilestoneTlsComponent', () => {
  let component: MilestoneTlsComponent;
  let fixture: ComponentFixture<MilestoneTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilestoneTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilestoneTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
