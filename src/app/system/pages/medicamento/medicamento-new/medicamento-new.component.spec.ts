import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoNewComponent } from './medicamento-new.component';

describe('MedicamentoNewComponent', () => {
  let component: MedicamentoNewComponent;
  let fixture: ComponentFixture<MedicamentoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
