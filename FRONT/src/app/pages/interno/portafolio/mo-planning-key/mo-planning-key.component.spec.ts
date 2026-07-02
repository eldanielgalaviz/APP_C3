import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoPlanningKeyComponent } from './mo-planning-key.component';

describe('MoPlanningKeyComponent', () => {
  let component: MoPlanningKeyComponent;
  let fixture: ComponentFixture<MoPlanningKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoPlanningKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoPlanningKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
