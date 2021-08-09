import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Schedule } from 'src/app/models/Schedule';
import { User } from 'src/app/models/User';
import { Reservations } from 'src/app/models/Reservations';

import { UserService } from 'src/app/services/user.service';
import { ReservationsService } from 'src/app/services/reservations.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacher-modal',
  templateUrl: './teacher-modal.component.html',
  styleUrls: ['./teacher-modal.component.css']
})
export class TeacherModalComponent implements OnInit {
  @Input() dayClass!: Schedule;
  @Input() capacity: number = 0;
  @Input() events: Observable<void>;
  @Input() reservations: Reservations[] = [];
  @ViewChild('content') private content: TemplateRef<any>;
  private eventsSubsription: Subscription;
  selectedStudent!: User;
  students: User[] = [];
  faTimes=faTimes;
  studentOk: number = 1;

  constructor(private modalService: NgbModal, private userService: UserService, private reservationsService: ReservationsService) { }

  ngOnInit(): void {
    this.eventsSubsription = this.events.subscribe(() => this.openModal(this.content));
    this.getStudents();
  }
  ngOnDestroy(){
    this.eventsSubsription.unsubscribe();
  }
  openModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true }).result.then( () => {this.addReservation(this.selectedStudent); }, () => {});
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

}