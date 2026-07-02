import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlNewActivityComponent } from './pl-new-activity.component';

describe('PlNewActivityComponent', () => {
  let component: PlNewActivityComponent;
  let fixture: ComponentFixture<PlNewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlNewActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlNewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
