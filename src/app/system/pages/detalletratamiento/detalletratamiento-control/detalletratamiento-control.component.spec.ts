import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalletratamientoControlComponent } from './detalletratamiento-control.component';

describe('DetalletratamientoControlComponent', () => {
  let component: DetalletratamientoControlComponent;
  let fixture: ComponentFixture<DetalletratamientoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalletratamientoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalletratamientoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
