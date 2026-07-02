import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanRegisComponent } from './list-plan-regis.component';

describe('ListPlanRegisComponent', () => {
  let component: ListPlanRegisComponent;
  let fixture: ComponentFixture<ListPlanRegisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlanRegisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanRegisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
