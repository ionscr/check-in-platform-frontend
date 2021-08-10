import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageClassroomsComponent } from './manage-classrooms.component';

describe('ManageClassroomsComponent', () => {
  let component: ManageClassroomsComponent;
  let fixture: ComponentFixture<ManageClassroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageClassroomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
