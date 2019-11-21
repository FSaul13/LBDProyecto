import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAlimentoControlComponent } from './animal-alimento-control.component';

describe('AnimalAlimentoControlComponent', () => {
  let component: AnimalAlimentoControlComponent;
  let fixture: ComponentFixture<AnimalAlimentoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAlimentoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAlimentoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
