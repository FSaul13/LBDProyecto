import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAlimentoComponent } from './animal-alimento.component';

describe('AnimalAlimentoComponent', () => {
  let component: AnimalAlimentoComponent;
  let fixture: ComponentFixture<AnimalAlimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAlimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
