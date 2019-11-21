import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalletratamientoNewComponent } from './detalletratamiento-new.component';

describe('DetalletratamientoNewComponent', () => {
  let component: DetalletratamientoNewComponent;
  let fixture: ComponentFixture<DetalletratamientoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalletratamientoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalletratamientoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
