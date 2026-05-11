import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionAndMonitoringComponent } from './execution-and-monitoring.component';

describe('ExecutionAndMonitoringComponent', () => {
  let component: ExecutionAndMonitoringComponent;
  let fixture: ComponentFixture<ExecutionAndMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionAndMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionAndMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
