import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenusTlsComponent } from './menus.tls.component';

describe('MenusTlsComponent', () => {
  let component: MenusTlsComponent;
  let fixture: ComponentFixture<MenusTlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenusTlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenusTlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
