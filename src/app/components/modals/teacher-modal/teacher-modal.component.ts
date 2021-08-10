import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { Schedule } from 'src/app/models/Schedule';
import { User } from 'src/app/models/User';
import { Reservations } from 'src/app/models/Reservations';
import { Feature } from 'src/app/models/Feature';
import { Classroom } from 'src/app/models/Classroom';

import { UserService } from 'src/app/services/user.service';
import { ReservationsService } from 'src/app/services/reservations.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClassroomService } from 'src/app/services/classroom.service';

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
  edit: boolean = false;
  class_name: string = "";

  constructor(private modalService: NgbModal, private userService: UserService, private reservationsService: ReservationsService, private classroomService: ClassroomService) { }

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
    this.edit = false;
    this.filteredClassrooms = this.filterClassrooms();
    this.modalService.open(content, { centered: true }).result.then( (value) => {if( value == 1) this.addReservation(this.selectedStudent); else if( value== 2) this.deleteReservation(this.selectedReservation); }, () => {});
  }
  getStudents(): void {
    this.userService.findUsersByRole(1).subscribe((students) => (this.students = students));
  }
  getClassrooms(): void{
    this.classroomService.getClassrooms().subscribe((classrooms) => (this.classrooms = classrooms));
  }
  deleteReservation(reservation: Reservations): void{
    this.reservationsService.deleteReservation(Number(reservation)).subscribe(() => (this.reservationEvent.emit(1)));
  }
  addReservation(student: User): void{
    if(this.capacity == this.dayClass.classroom.capacity){
      alert("This classroom is at full capacity!");
    } 
    else{
      this.studentOk = 1;
      const student1: User = {id: Number(JSON.stringify(student).match(/\d/g)), first_name: "", last_name: "", role: 1};
      this.reservations.forEach(reservation => {
        if(reservation.student.id === student1.id) this.studentOk = 0;
      });
      if(this.studentOk){
        const reservation: Reservations = {schedule: this.dayClass, student: student1}
        this.reservationsService.addReservation(reservation).subscribe((reservation) => (this.reservations.push(reservation), this.capacity = this.reservations.length));
        this.reservationEvent.emit(1);
      }
      else{
        alert("This student already has a reservation!");
      }
    }
  }
  onEdit(){
    this.edit = !this.edit;
  }
  onSave(){
    this.edit = !this.edit;
  }
  filterClassrooms(): Classroom[] {
    return this.classrooms.filter(classroom => classroom.id != this.dayClass.classroom.id);
  }
}
