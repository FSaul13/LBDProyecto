import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermedadNewComponent } from './enfermedad-new.component';

describe('EnfermedadNewComponent', () => {
  let component: EnfermedadNewComponent;
  let fixture: ComponentFixture<EnfermedadNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfermedadNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfermedadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
