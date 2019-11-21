import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermedadEditComponent } from './enfermedad-edit.component';

describe('EnfermedadEditComponent', () => {
  let component: EnfermedadEditComponent;
  let fixture: ComponentFixture<EnfermedadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfermedadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfermedadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
