import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTratamientoEnfermedadComponent } from './consulta-tratamiento-enfermedad.component';

describe('ConsultaTratamientoEnfermedadComponent', () => {
  let component: ConsultaTratamientoEnfermedadComponent;
  let fixture: ComponentFixture<ConsultaTratamientoEnfermedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaTratamientoEnfermedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaTratamientoEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
