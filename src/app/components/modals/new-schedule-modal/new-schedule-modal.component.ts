import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClassService } from 'src/app/services/class.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { Classroom } from 'src/app/models/Classroom';
import { Class } from 'src/app/models/Class';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';

import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbInputDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import { DateService } from 'src/app/services/date.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/Schedule';
@Component({
  selector: 'app-new-schedule-modal',
  templateUrl: './new-schedule-modal.component.html',
  styleUrls: ['./new-schedule-modal.component.css']
})
export class NewScheduleModalComponent implements OnInit {
  @Input() events: Observable<void>;
  @Input() day: number = -1;
  @Input() weekNr: number = 0;
  @ViewChild('content') private content: TemplateRef<any>;
  private eventsSubsription: Subscription;
  faTimes=faTimes;
  classrooms: Classroom[] = [];
  classes: Class[] = [];
  selectedClass!: Class;
  selectedClassroom!: Classroom;
  date!: NgbDateStruct;
  time: NgbTimeStruct = {hour: 12, minute: 30, second: 0};
  faCalendarDay=faCalendarDay;

  constructor(private scheduleService: ScheduleService ,private dateService: DateService ,private config: NgbInputDatepickerConfig, private calendar: NgbCalendar,private modalService: NgbModal, private classService: ClassService, private classroomService: ClassroomService) {
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
    config.outsideDays = 'hidden';
    config.autoClose = 'outside';
    config.placement = ['top-left', 'top-right'];
   }

  ngOnInit(): void {
    this.eventsSubsription = this.events.subscribe(() => this.openModal(this.content));
    this.classService.getClasses().subscribe((classes) => this.classes = classes);
    this.classroomService.getClassrooms().subscribe((classrooms) => this.classrooms = classrooms);
    }
  ngOnDestroy(){
    this.eventsSubsription.unsubscribe();
  }
  openModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true }).result.then(() => {this.addNewSchedule()}, () => {})
  }
  addNewSchedule(){
    var month: string;
    var day: string;
    var hour: string;
    var minute: string;
    if(this.date.month.toString().length==1) month = "0"+ this.date.month;
    else month = this.date.month.toString();
    if(this.date.day.toString().length==1) day = "0"+ this.date.day;
    else day = this.date.day.toString();
    if(this.time.hour.toString().length==1) hour = "0"+ this.time.hour;
    else hour = this.time.hour.toString();
    if(this.time.minute.toString().length==1) minute = "0"+ this.time.minute;
    else minute = this.time.minute.toString();
    var date: string = this.date.year + "-" + month + "-" + day;
    var time: string = hour + ":" + minute + ":00";
    const schedule: Schedule = {localDate: date, localTime: time, classn: this.selectedClass, classroom: this.selectedClassroom};
    this.scheduleService.addSchedule(schedule).subscribe();
  }
}
