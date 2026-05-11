import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByTransactionComponent } from './by-transaction.component';

describe('ByTransactionComponent', () => {
  let component: ByTransactionComponent;
  let fixture: ComponentFixture<ByTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByTransactionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
