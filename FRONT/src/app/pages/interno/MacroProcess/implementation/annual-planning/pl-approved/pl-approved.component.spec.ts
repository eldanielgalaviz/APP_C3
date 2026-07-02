import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlApprovedComponent } from './pl-approved.component';

describe('PlApprovedComponent', () => {
  let component: PlApprovedComponent;
  let fixture: ComponentFixture<PlApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlApprovedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
