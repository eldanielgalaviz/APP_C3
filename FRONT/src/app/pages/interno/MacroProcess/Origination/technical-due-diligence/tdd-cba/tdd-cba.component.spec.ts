import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TddCbaComponent } from './tdd-cba.component';

describe('TddCbaComponent', () => {
  let component: TddCbaComponent;
  let fixture: ComponentFixture<TddCbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TddCbaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TddCbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
