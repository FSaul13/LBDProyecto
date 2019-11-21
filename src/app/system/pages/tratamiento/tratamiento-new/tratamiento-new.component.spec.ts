import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoNewComponent } from './tratamiento-new.component';

describe('TratamientoNewComponent', () => {
  let component: TratamientoNewComponent;
  let fixture: ComponentFixture<TratamientoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamientoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
