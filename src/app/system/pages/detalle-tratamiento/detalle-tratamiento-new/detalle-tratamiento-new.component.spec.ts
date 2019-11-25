import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleTratamientoNewComponent } from './detalle-tratamiento-new.component';

describe('DetalleTratamientoNewComponent', () => {
  let component: DetalleTratamientoNewComponent;
  let fixture: ComponentFixture<DetalleTratamientoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleTratamientoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleTratamientoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
