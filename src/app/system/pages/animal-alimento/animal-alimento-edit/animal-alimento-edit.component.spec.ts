import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAlimentoEditComponent } from './animal-alimento-edit.component';

describe('AnimalAlimentoEditComponent', () => {
  let component: AnimalAlimentoEditComponent;
  let fixture: ComponentFixture<AnimalAlimentoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAlimentoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAlimentoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
