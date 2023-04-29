import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingActivityComponent } from './booking-activity.component';

describe('BookingActivityComponent', () => {
  let component: BookingActivityComponent;
  let fixture: ComponentFixture<BookingActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
