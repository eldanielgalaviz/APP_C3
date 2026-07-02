import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanRepoComponent } from './list-plan-repo.component';

describe('ListPlanRepoComponent', () => {
  let component: ListPlanRepoComponent;
  let fixture: ComponentFixture<ListPlanRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlanRepoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlanRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
