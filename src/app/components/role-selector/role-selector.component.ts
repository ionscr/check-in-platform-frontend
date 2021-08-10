import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css']
})
export class RoleSelectorComponent implements OnInit {
  newScheduleEventSubject: Subject<void> = new Subject<void>();
  newUserEventSubject: Subject<void> = new Subject<void>();
  newClassEventSubject: Subject<void> = new Subject<void>();
  newClassroomEventSubject: Subject<void> = new Subject<void>();
  role: string = "guest";
  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.setRole(this.role);
  }
  onChange(): void{
    this.roleService.setRole(this.role);
  }
  onAddSchedule(): void {
    this.newScheduleEventSubject.next();
  }
  onAddClass(): void {
    this.newClassEventSubject.next();
  }
  onAddUser(): void {
    this.newUserEventSubject.next();
  }
  onAddClassroom(): void {
    this.newClassroomEventSubject.next();
  }
}
