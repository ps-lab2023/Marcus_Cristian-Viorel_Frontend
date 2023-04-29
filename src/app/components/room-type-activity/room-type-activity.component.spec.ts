import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeActivityComponent } from './room-type-activity.component';

describe('RoomTypeActivityComponent', () => {
  let component: RoomTypeActivityComponent;
  let fixture: ComponentFixture<RoomTypeActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTypeActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomTypeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
