import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlViewPlanCronogramaComponent } from './pl-view-plan-cronograma.component';

describe('PlViewPlanCronogramaComponent', () => {
  let component: PlViewPlanCronogramaComponent;
  let fixture: ComponentFixture<PlViewPlanCronogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlViewPlanCronogramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlViewPlanCronogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
