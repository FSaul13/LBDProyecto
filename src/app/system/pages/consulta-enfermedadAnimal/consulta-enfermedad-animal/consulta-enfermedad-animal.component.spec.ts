import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEnfermedadAnimalComponent } from './consulta-enfermedad-animal.component';

describe('ConsultaEnfermedadAnimalComponent', () => {
  let component: ConsultaEnfermedadAnimalComponent;
  let fixture: ComponentFixture<ConsultaEnfermedadAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaEnfermedadAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaEnfermedadAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
