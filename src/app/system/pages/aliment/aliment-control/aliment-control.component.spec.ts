import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentControlComponent } from './aliment-control.component';

describe('AlimentControlComponent', () => {
  let component: AlimentControlComponent;
  let fixture: ComponentFixture<AlimentControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
