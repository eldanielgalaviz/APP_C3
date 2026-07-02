import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanImpleComponent } from './list-plan-imple.component';

describe('ListPlanImpleComponent', () => {
  let component: ListPlanImpleComponent;
  let fixture: ComponentFixture<ListPlanImpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlanImpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanImpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
