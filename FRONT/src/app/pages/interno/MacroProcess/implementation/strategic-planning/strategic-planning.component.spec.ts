import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicPlanningComponent } from './strategic-planning.component';

describe('StrategicPlanningComponent', () => {
  let component: StrategicPlanningComponent;
  let fixture: ComponentFixture<StrategicPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategicPlanningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
