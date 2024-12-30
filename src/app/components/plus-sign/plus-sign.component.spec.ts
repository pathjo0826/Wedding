import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlusSignComponent } from './plus-sign.component';

describe('PlusSignComponent', () => {
  let component: PlusSignComponent;
  let fixture: ComponentFixture<PlusSignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlusSignComponent]
    });
    fixture = TestBed.createComponent(PlusSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
