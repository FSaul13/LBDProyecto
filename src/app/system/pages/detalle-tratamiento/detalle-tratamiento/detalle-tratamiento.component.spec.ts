import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTratamientoComponent } from './detalle-tratamiento.component';

describe('DetalleTratamientoComponent', () => {
  let component: DetalleTratamientoComponent;
  let fixture: ComponentFixture<DetalleTratamientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTratamientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTratamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
