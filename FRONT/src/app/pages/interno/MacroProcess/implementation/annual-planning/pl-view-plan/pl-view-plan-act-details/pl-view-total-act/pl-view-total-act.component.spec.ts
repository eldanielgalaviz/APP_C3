import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlViewTotalActComponent } from './pl-view-total-act.component';

describe('PlViewTotalActComponent', () => {
  let component: PlViewTotalActComponent;
  let fixture: ComponentFixture<PlViewTotalActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlViewTotalActComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlViewTotalActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
