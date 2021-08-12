import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { RefreshService } from 'src/app/services/refresh.service';
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
  refresh: boolean = false;
  constructor(private roleService: RoleService, private refreshService: RefreshService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.roleService.setRole(this.role);
    this.refreshService.refreshChange.subscribe(value => {this.refresh = value});
    this.refreshService.changeDetectionEmitter.subscribe(
      () => {
        this.cdRef.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
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
