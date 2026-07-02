import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlViewPlanActDetailsComponent } from './pl-view-plan-act-details.component';

describe('PlViewPlanActDetailsComponent', () => {
  let component: PlViewPlanActDetailsComponent;
  let fixture: ComponentFixture<PlViewPlanActDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlViewPlanActDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlViewPlanActDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
