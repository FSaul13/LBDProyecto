import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaSintomasEnfermedadComponent } from './consulta-sintomas-enfermedad.component';

describe('ConsultaSintomasEnfermedadComponent', () => {
  let component: ConsultaSintomasEnfermedadComponent;
  let fixture: ComponentFixture<ConsultaSintomasEnfermedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaSintomasEnfermedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaSintomasEnfermedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
