import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesReviewComponent } from './expenses-review.component';

describe('ExpensesReviewComponent', () => {
  let component: ExpensesReviewComponent;
  let fixture: ComponentFixture<ExpensesReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpensesReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
