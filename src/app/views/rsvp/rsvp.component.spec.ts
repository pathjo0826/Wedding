import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpComponent } from './rsvp.component';

describe('RsvpComponent', () => {
  let component: RsvpComponent;
  let fixture: ComponentFixture<RsvpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RsvpComponent]
    });
    fixture = TestBed.createComponent(RsvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});