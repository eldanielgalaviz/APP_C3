import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlViewPlanComponent } from './pl-view-plan.component';

describe('PlViewPlanComponent', () => {
  let component: PlViewPlanComponent;
  let fixture: ComponentFixture<PlViewPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlViewPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlViewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
