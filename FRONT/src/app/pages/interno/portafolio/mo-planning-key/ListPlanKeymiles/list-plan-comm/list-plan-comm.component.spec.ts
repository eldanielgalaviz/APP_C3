import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanCommComponent } from './list-plan-comm.component';

describe('ListPlanCommComponent', () => {
  let component: ListPlanCommComponent;
  let fixture: ComponentFixture<ListPlanCommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlanCommComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanCommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
