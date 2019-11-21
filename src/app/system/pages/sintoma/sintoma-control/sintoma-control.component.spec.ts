import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SintomaControlComponent } from './sintoma-control.component';

describe('SintomaControlComponent', () => {
  let component: SintomaControlComponent;
  let fixture: ComponentFixture<SintomaControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SintomaControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SintomaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
