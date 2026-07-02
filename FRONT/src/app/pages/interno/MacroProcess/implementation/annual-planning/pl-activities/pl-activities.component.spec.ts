import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlActivitiesComponent } from './pl-activities.component';

describe('PlActivitiesComponent', () => {
  let component: PlActivitiesComponent;
  let fixture: ComponentFixture<PlActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
