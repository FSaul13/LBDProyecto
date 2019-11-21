import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SintomaEditComponent } from './sintoma-edit.component';

describe('SintomaEditComponent', () => {
  let component: SintomaEditComponent;
  let fixture: ComponentFixture<SintomaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SintomaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SintomaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
