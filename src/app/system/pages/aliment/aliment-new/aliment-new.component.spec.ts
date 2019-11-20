import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentNewComponent } from './aliment-new.component';

describe('AlimentNewComponent', () => {
  let component: AlimentNewComponent;
  let fixture: ComponentFixture<AlimentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlimentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
