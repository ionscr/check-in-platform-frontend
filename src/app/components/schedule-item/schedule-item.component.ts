import { Component, OnInit, Input } from '@angular/core';
import { Reservations } from 'src/app/models/Reservations';
import { Schedule } from 'src/app/models/Schedule';
import { User } from 'src/app/models/User';

import { ReservationsService } from 'src/app/services/reservations.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

import { map } from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {
  @Input() dayClass!: Schedule;
  reservations: Reservations[] = [];
  role: string = "";
  capacity: number = 0;
  faTimes = faTimes;
  guestEventSubject: Subject<void> = new Subject<void>();
  studentEventSubject: Subject<void> = new Subject<void>();
  teacherEventSubject: Subject<void> = new Subject<void>();
  adminEventSubject: Subject<void> = new Subject<void>();

  constructor(private reservationsService: ReservationsService, private modalService: NgbModal, private roleService: RoleService, private userService: UserService) { }

  ngOnInit(): void {
    this.getReservations();
  }
  getReservations(): void {
    this.reservationsService.getReservations().pipe(
      map(reservations => 
        reservations.filter(reservation => reservation.schedule.id == this.dayClass.id))
      ).subscribe((reservations) => (this.reservations = reservations, this.capacity = reservations.length));
  }
  callModal(){
    this.role = this.roleService.getRole();
    if(this.role == 'guest') this.guestEventSubject.next();
    if(this.role == 'student') this.studentEventSubject.next();
    if(this.role == 'teacher') this.teacherEventSubject.next();
  }
}
