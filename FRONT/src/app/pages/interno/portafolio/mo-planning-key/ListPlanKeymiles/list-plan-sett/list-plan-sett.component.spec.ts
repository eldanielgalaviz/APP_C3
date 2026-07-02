import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanSettComponent } from './list-plan-sett.component';

describe('ListPlanSettComponent', () => {
  let component: ListPlanSettComponent;
  let fixture: ComponentFixture<ListPlanSettComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlanSettComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanSettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
