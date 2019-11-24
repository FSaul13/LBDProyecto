import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalletratamientoComponent } from './detalletratamiento.component';

describe('DetalletratamientoComponent', () => {
  let component: DetalletratamientoComponent;
  let fixture: ComponentFixture<DetalletratamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalletratamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalletratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
