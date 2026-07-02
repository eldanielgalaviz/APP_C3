import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlOpensComponent } from './pl-opens.component';

describe('PlOpensComponent', () => {
  let component: PlOpensComponent;
  let fixture: ComponentFixture<PlOpensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlOpensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlOpensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
