import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalNewComponent } from './animal-new.component';

describe('AnimalNewComponent', () => {
  let component: AnimalNewComponent;
  let fixture: ComponentFixture<AnimalNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimalNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
