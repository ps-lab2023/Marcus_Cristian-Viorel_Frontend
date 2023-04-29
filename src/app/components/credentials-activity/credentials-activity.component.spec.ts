import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsActivityComponent } from './credentials-activity.component';

describe('CredentialsActivityComponent', () => {
  let component: CredentialsActivityComponent;
  let fixture: ComponentFixture<CredentialsActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CredentialsActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CredentialsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
