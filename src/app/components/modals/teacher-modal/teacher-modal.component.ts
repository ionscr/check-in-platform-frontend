import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

import { Schedule } from 'src/app/models/Schedule';
import { User } from 'src/app/models/User';
import { Reservations } from 'src/app/models/Reservations';
import { Feature } from 'src/app/models/Feature';
import { Classroom } from 'src/app/models/Classroom';

import { UserService } from 'src/app/services/user.service';
import { ReservationsService } from 'src/app/services/reservations.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassService } from 'src/app/services/class.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { RefreshService } from 'src/app/services/refresh.service';

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
  @Input() features: Feature[] = [];
  @Output() reservationEvent = new EventEmitter<number>(); 
  @ViewChild('content') private content: TemplateRef<any>;
  private eventsSubsription: Subscription;
  selectedStudent!: User;
  students: User[] = [];
  selectedReservation!: Reservations;
  selectedClassroom!: Classroom;
  classrooms: Classroom[] = [];
  filteredClassrooms: Classroom[] = [];
  faTimes=faTimes;
  studentOk: number = 1;
  class_name: string = "";
  class_year: string = "";
  class_section: string = "";
  time: NgbTimeStruct;

  constructor(private refreshService: RefreshService ,private modalService: NgbModal, private userService: UserService, private reservationsService: ReservationsService, private classroomService: ClassroomService, private classService: ClassService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.eventsSubsription = this.events.subscribe(() => this.openModal(this.content));
    this.getStudents();
    this.getClassrooms();
  }
  ngOnDestroy(){
    this.eventsSubsription.unsubscribe();
  }
  openModal(content: TemplateRef<any>): void {
    this.class_name = this.dayClass.classn.name;
    this.selectedClassroom = this.dayClass.classroom;
    this.class_section = this.dayClass.classn.section;
    this.class_year = this.dayClass.classn.year.toString();
    const timec = this.dayClass.localTime.split(":");
    this.time = {hour: Number(timec[0]), minute: Number(timec[1]), second: Number(timec[2]) };
    this.selectedClassroom = this.dayClass.classroom;
    this.filteredClassrooms = this.filterClassrooms();
    this.getStudents();
    this.getClassrooms();
    this.modalService.open(content, { centered: true }).result.then( (value) => {if( value == 1) this.addReservation(this.selectedStudent); else if( value== 2) this.deleteReservation(this.selectedReservation); else if(value == 3) this.deleteSchedule(); else if(value == 4) this.onSave(); }, () => {});
  }
  getStudents(): void {
    this.userService.findUsersByRole(1).subscribe((students) => (this.students = students));
  }
  getClassrooms(): void{
    this.classroomService.getClassrooms().subscribe((classrooms) => (this.classrooms = classrooms));
  }
  deleteReservation(reservation: Reservations): void{
    this.reservationsService.deleteReservation(Number(reservation.id)).subscribe(() => (this.reservationEvent.emit(1)));
    this.requestRefresh();
  }
  addReservation(student: User): void{
    if(this.capacity == this.dayClass.classroom.capacity){
      alert("This classroom is at full capacity!");
    } 
    else{
      this.studentOk = 1;
      this.reservations.forEach(reservation => {
        if(reservation.student.id === student.id) this.studentOk = 0;
      });
      if(this.studentOk){
        const reservation: Reservations = {schedule: this.dayClass, student: student}
        this.reservationsService.addReservation(reservation).subscribe((reservation) => (this.reservations.push(reservation), this.capacity = this.reservations.length));
      }
      else{
        alert("This student already has a reservation!");
      }
    }
    this.requestRefresh();
  }
  onSave(){
    this.dayClass.classn.name = this.class_name;
    this.dayClass.classroom = this.selectedClassroom;
    this.classService.updateClass(this.dayClass.classn).subscribe();
    this.scheduleService.updateSchedule(this.dayClass).subscribe();
    this.requestRefresh();
  }
  filterClassrooms(): Classroom[] {
    return this.classrooms.filter(classroom => classroom.id != this.dayClass.classroom.id);
  }
  deleteScheduleReservations(){
    this.reservations.forEach((reservation) => {this.reservationsService.deleteReservation(Number(reservation.id)).subscribe();});
  }
  deleteSchedule(){
    if(this.dayClass.id != undefined){
      this.deleteScheduleReservations();
      this.scheduleService.deleteSchedule(this.dayClass.id).subscribe();
    }
    this.requestRefresh();
  }
  requestRefresh(){
    this.refreshService.setRefresh(true);
    this.refreshService.setRefresh(false);
  }
}
