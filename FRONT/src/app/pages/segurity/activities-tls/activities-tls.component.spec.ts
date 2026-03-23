import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesTlsComponent } from './activities-tls.component';

describe('ActivitiesTlsComponent', () => {
  let component: ActivitiesTlsComponent;
  let fixture: ComponentFixture<ActivitiesTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitiesTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
