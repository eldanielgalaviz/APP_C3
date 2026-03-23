import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubprocessTlsComponent } from './subprocess-tls.component';

describe('SubprocessTlsComponent', () => {
  let component: SubprocessTlsComponent;
  let fixture: ComponentFixture<SubprocessTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubprocessTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubprocessTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
