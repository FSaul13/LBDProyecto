import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTratamientoControlComponent } from './detalle-tratamiento-control.component';

describe('DetalleTratamientoControlComponent', () => {
  let component: DetalleTratamientoControlComponent;
  let fixture: ComponentFixture<DetalleTratamientoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTratamientoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTratamientoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
