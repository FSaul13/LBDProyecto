import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalletratamientoEditComponent } from './detalletratamiento-edit.component';

describe('DetalletratamientoEditComponent', () => {
  let component: DetalletratamientoEditComponent;
  let fixture: ComponentFixture<DetalletratamientoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalletratamientoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalletratamientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
