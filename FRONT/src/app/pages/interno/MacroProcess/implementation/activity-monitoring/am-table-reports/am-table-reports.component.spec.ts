import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmTableReportsComponent } from './am-table-reports.component';

describe('AmTableReportsComponent', () => {
  let component: AmTableReportsComponent;
  let fixture: ComponentFixture<AmTableReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmTableReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmTableReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
