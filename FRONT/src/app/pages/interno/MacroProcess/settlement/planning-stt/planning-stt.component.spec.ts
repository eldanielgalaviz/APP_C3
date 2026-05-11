import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningSttComponent } from './planning-stt.component';

describe('PlanningSttComponent', () => {
  let component: PlanningSttComponent;
  let fixture: ComponentFixture<PlanningSttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanningSttComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningSttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
