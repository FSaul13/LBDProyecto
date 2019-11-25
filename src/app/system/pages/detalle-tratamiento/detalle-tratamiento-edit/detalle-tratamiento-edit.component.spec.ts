import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTratamientoEditComponent } from './detalle-tratamiento-edit.component';

describe('DetalleTratamientoEditComponent', () => {
  let component: DetalleTratamientoEditComponent;
  let fixture: ComponentFixture<DetalleTratamientoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTratamientoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTratamientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
