import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMedicamentosTratamientoComponent } from './consulta-medicamentos-tratamiento.component';

describe('ConsultaMedicamentosTratamientoComponent', () => {
  let component: ConsultaMedicamentosTratamientoComponent;
  let fixture: ComponentFixture<ConsultaMedicamentosTratamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaMedicamentosTratamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaMedicamentosTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
