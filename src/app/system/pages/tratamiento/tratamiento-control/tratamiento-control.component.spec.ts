import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoControlComponent } from './tratamiento-control.component';

describe('TratamientoControlComponent', () => {
  let component: TratamientoControlComponent;
  let fixture: ComponentFixture<TratamientoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamientoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
