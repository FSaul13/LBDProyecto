import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoEditComponent } from './tratamiento-edit.component';

describe('TratamientoEditComponent', () => {
  let component: TratamientoEditComponent;
  let fixture: ComponentFixture<TratamientoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TratamientoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TratamientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
