import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentEditComponent } from './aliment-edit.component';

describe('AlimentEditComponent', () => {
  let component: AlimentEditComponent;
  let fixture: ComponentFixture<AlimentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
