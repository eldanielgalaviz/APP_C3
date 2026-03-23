import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TddDocumentComponent } from './tdd-document.component';

describe('TddDocumentComponent', () => {
  let component: TddDocumentComponent;
  let fixture: ComponentFixture<TddDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TddDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TddDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
