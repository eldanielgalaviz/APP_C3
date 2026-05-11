import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ByAccountsComponent } from './by-accounts.component';

describe('ByAccountsComponent', () => {
  let component: ByAccountsComponent;
  let fixture: ComponentFixture<ByAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ByAccountsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
