import { Component, OnInit, Input } from '@angular/core';
import { Reservations } from 'src/app/models/Reservations';
import { Schedule } from 'src/app/models/Schedule';
import { User } from 'src/app/models/User';

import { ReservationsService } from 'src/app/services/reservations.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

import { map, filter } from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {
  @Input() dayClass!: Schedule;
  selectedStudent!: User;
  role: string = "";
  reservations: Reservations[] = [];
  students: User[] = [];
  capacity: number = 0;
  faTimes = faTimes;
  studentOk: number = 1;
  guestEventSubject: Subject<void> = new Subject<void>();
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
  getStudents(): void {
    this.userService.findUsersByRole(1).subscribe((students) => (this.students = students));
  }
  addReservation(student: User): void{
    this.studentOk = 1;
    const student1: User = {id: Number(JSON.stringify(student).match(/\d/g)), first_name: "", last_name: "", role: 1};
    this.reservations.forEach(reservation => {
      if(reservation.student.id === student1.id) this.studentOk = 0;
    });
    if(this.studentOk){
      const reservation: Reservations = {schedule: this.dayClass, student: student1}
      this.reservationsService.addReservation(reservation).subscribe((reservation) => (this.reservations.push(reservation), this.capacity = this.reservations.length));
    }
    else{
      alert("This student already has a reservation!");
    }
  }
  openModal(content: TemplateRef<any>): void {
    this.role = this.roleService.getRole();
    this.getStudents();
    this.modalService.open(content, { centered: true }).result.then(() => { this.addReservation(this.selectedStudent); }, () => {})
  }
  callModal(){
    this.role = this.roleService.getRole();
    if(this.role == 'guest') this.guestEventSubject.next();
  }
}
