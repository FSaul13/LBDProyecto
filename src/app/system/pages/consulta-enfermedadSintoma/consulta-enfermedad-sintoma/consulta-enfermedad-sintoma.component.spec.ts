import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEnfermedadSintomaComponent } from './consulta-enfermedad-sintoma.component';

describe('ConsultaEnfermedadSintomaComponent', () => {
  let component: ConsultaEnfermedadSintomaComponent;
  let fixture: ComponentFixture<ConsultaEnfermedadSintomaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEnfermedadSintomaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEnfermedadSintomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
