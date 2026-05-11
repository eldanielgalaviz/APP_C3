import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByActivitiesComponent } from './by-activities.component';

describe('ByActivitiesComponent', () => {
  let component: ByActivitiesComponent;
  let fixture: ComponentFixture<ByActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
