import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RefreshService } from 'src/app/services/refresh.service';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models/Class';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Schedule } from 'src/app/models/Schedule';
import { map } from 'rxjs/operators';
import { Reservations } from 'src/app/models/Reservations';
@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css']
})
export class ManageClassesComponent implements OnInit {
  @Input() events: Observable<void>;
  @ViewChild('content') private content: TemplateRef<any>;
  private eventsSubsription: Subscription;
  classes: Class[] = [];
  teachers: User[] = [];
  schedules: Schedule[] = [];
  reservations: Reservations[] = [];
  updatedClass: Class;
  selectedClass: Class;
  class_name: string = "";
  class_year: number = 0;
  class_section: string = "";
  class_teacher!: User;
  update_class_name: string = "";
  update_class_year: number = 0;
  update_class_section: string = "";
  update_class_teacher!: User;
  faTimes = faTimes;

  constructor(private scheduleService: ScheduleService, private reservationService: ReservationsService ,private refreshService: RefreshService ,private modalService: NgbModal, private classService: ClassService, private userService: UserService) { }

  ngOnInit(): void {
    this.eventsSubsription = this.events.subscribe(() => this.openModal(this.content));
  }
  ngOnDestroy(): void{
    this.eventsSubsription.unsubscribe();
  }
  openModal(content: TemplateRef<any>): void {
    this.clearParams();
    this.getClasses();
    this.getTeachers();
    this.scheduleService.getSchedules().subscribe((schedules) => (this.schedules = schedules));
    this.reservationService.getReservations().subscribe((reservations) => (this.reservations = reservations));
    this.modalService.open(content, { centered: true }).result.then((value) => {if(value == 1) this.addClass(); if(value == 2) this.updateClass(); if(value == 3) this.deleteClass();}, () => {this.requestRefresh()})
  }
  getClasses(){
    this.classService.getClasses().subscribe((classes) => (this.classes = classes));
  }
  getTeachers(){
    this.userService.findUsersByRole(2).subscribe((teachers) => (this.teachers = teachers));
  }
  addClass(){
    const class1: Class = {name: this.class_name, teacher: this.class_teacher, year: Number(this.class_year), section: this.class_section };
    this.classService.addClass(class1).subscribe();
    this.getClasses();
  }
  updateClass(){
    this.updatedClass.name = this.update_class_name;
    this.updatedClass.teacher = this.update_class_teacher;
    this.updatedClass.section = this.update_class_section;
    this.updatedClass.year = Number(this.update_class_year);
    this.classService.updateClass(this.updatedClass).subscribe();
  }
  deleteSchedulesByClass(){
    var selectedSchedules: Schedule[] = [];
    var selectedReservations: Reservations[] = [];
    this.reservations.forEach((reservation) => {if(reservation.schedule.classn.id == this.selectedClass.id) selectedReservations.push(reservation);});
    this.schedules.forEach((schedule) => {if(schedule.classn.id == this.selectedClass.id) selectedSchedules.push(schedule)});
    selectedReservations.forEach((reservation) => {this.reservationService.deleteReservation(reservation.id).subscribe()});
    selectedSchedules.forEach((schedule) => {this.scheduleService.deleteSchedule(schedule.id).subscribe()});
  }
  deleteClass(){
    if(this.selectedClass != null && this.selectedClass != undefined){
    this.deleteSchedulesByClass();
    this.classService.deleteClass(Number(this.selectedClass.id)).subscribe();
    this.requestRefresh();
    }
  }
  requestRefresh(){
    this.refreshService.setRefresh(true);
    this.refreshService.setRefresh(false);
  }
  clearParams(){
    this.updatedClass = null;
    this.selectedClass = null;
    this.class_name = "";
    this.class_section = "";
    this.class_teacher = null;
    this.class_year = 0;
    this.update_class_name = "";
    this.update_class_section = "";
    this.update_class_teacher = null;
    this.update_class_year = 0;
  }
}
