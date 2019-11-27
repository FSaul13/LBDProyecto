import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaAlimentosComponent } from './consulta-alimentos.component';

describe('ConsultaAlimentosComponent', () => {
  let component: ConsultaAlimentosComponent;
  let fixture: ComponentFixture<ConsultaAlimentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaAlimentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAlimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
