import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoProjectOverviewComponent } from './mo-project-overview.component';

describe('MoProjectOverviewComponent', () => {
  let component: MoProjectOverviewComponent;
  let fixture: ComponentFixture<MoProjectOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoProjectOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoProjectOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
