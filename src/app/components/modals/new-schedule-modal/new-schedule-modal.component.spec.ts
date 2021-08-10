import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewScheduleModalComponent } from './new-schedule-modal.component';

describe('NewScheduleModalComponent', () => {
  let component: NewScheduleModalComponent;
  let fixture: ComponentFixture<NewScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewScheduleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
