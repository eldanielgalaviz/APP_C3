import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlViewActivityComponent } from './pl-view-activity.component';

describe('PlViewActivityComponent', () => {
  let component: PlViewActivityComponent;
  let fixture: ComponentFixture<PlViewActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlViewActivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlViewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
