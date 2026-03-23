import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjtypesTlsComponent } from './adjtypes-tls.component';

describe('AdjtypesTlsComponent', () => {
  let component: AdjtypesTlsComponent;
  let fixture: ComponentFixture<AdjtypesTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjtypesTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdjtypesTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
