import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantRoomsActivityComponent } from './vacant-rooms-activity.component';

describe('VacantRoomsActivityComponent', () => {
  let component: VacantRoomsActivityComponent;
  let fixture: ComponentFixture<VacantRoomsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacantRoomsActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacantRoomsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
