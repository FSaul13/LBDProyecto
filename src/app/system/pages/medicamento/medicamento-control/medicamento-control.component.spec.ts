import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoControlComponent } from './medicamento-control.component';

describe('MedicamentoControlComponent', () => {
  let component: MedicamentoControlComponent;
  let fixture: ComponentFixture<MedicamentoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
