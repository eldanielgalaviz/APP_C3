import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoProjectStatusComponent } from './mo-project-status.component';

describe('MoProjectStatusComponent', () => {
  let component: MoProjectStatusComponent;
  let fixture: ComponentFixture<MoProjectStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoProjectStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoProjectStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
