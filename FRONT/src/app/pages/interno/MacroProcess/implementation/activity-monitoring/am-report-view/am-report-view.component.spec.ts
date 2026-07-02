import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmReportViewComponent } from './am-report-view.component';

describe('AmReportViewComponent', () => {
  let component: AmReportViewComponent;
  let fixture: ComponentFixture<AmReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmReportViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
