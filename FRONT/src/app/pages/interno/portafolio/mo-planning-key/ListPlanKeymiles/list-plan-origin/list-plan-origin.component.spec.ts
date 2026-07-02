import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanOriginComponent } from './list-plan-origin.component';

describe('ListPlanOriginComponent', () => {
  let component: ListPlanOriginComponent;
  let fixture: ComponentFixture<ListPlanOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlanOriginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
