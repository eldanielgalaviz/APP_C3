import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByBenefitDistributionComponent } from './by-benefit-distribution.component';

describe('ByBenefitDistributionComponent', () => {
  let component: ByBenefitDistributionComponent;
  let fixture: ComponentFixture<ByBenefitDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByBenefitDistributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByBenefitDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
