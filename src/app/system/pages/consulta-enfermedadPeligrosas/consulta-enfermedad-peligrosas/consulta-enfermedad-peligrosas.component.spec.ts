import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEnfermedadPeligrosasComponent } from './consulta-enfermedad-peligrosas.component';

describe('ConsultaEnfermedadPeligrosasComponent', () => {
  let component: ConsultaEnfermedadPeligrosasComponent;
  let fixture: ComponentFixture<ConsultaEnfermedadPeligrosasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEnfermedadPeligrosasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEnfermedadPeligrosasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
