import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermedadControlComponent } from './enfermedad-control.component';

describe('EnfermedadControlComponent', () => {
  let component: EnfermedadControlComponent;
  let fixture: ComponentFixture<EnfermedadControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfermedadControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfermedadControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
