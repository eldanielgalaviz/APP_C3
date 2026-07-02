import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanVeriComponent } from './list-plan-veri.component';

describe('ListPlanVeriComponent', () => {
  let component: ListPlanVeriComponent;
  let fixture: ComponentFixture<ListPlanVeriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlanVeriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanVeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
