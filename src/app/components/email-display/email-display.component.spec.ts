import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailDisplayComponent } from './email-display.component';

describe('EmailDisplayComponent', () => {
  let component: EmailDisplayComponent;
  let fixture: ComponentFixture<EmailDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailDisplayComponent]
    });
    fixture = TestBed.createComponent(EmailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
