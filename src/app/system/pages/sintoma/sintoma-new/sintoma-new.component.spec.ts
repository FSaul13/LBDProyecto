import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SintomaNewComponent } from './sintoma-new.component';

describe('SintomaNewComponent', () => {
  let component: SintomaNewComponent;
  let fixture: ComponentFixture<SintomaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SintomaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SintomaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
