import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPMToProjectComponent } from './assign-pm-to-project.component';

describe('AssignPMToProjectComponent', () => {
  let component: AssignPMToProjectComponent;
  let fixture: ComponentFixture<AssignPMToProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignPMToProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignPMToProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
