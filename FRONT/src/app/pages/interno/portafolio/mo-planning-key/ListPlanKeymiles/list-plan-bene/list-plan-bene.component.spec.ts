import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanBeneComponent } from './list-plan-bene.component';

describe('ListPlanBeneComponent', () => {
  let component: ListPlanBeneComponent;
  let fixture: ComponentFixture<ListPlanBeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlanBeneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanBeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
