import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoGannKeyComponent } from './mo-gann-key.component';

describe('MoGannKeyComponent', () => {
  let component: MoGannKeyComponent;
  let fixture: ComponentFixture<MoGannKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoGannKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoGannKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
