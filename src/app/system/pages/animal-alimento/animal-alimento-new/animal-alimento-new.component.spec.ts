import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalAlimentoNewComponent } from './animal-alimento-new.component';

describe('AnimalAlimentoNewComponent', () => {
  let component: AnimalAlimentoNewComponent;
  let fixture: ComponentFixture<AnimalAlimentoNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalAlimentoNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalAlimentoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
