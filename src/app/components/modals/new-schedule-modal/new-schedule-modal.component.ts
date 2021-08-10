import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
  date: NgbDateStruct;
  faCalendarDay=faCalendarDay;
  constructor(private dateService: DateService ,private config: NgbInputDatepickerConfig, private calendar: NgbCalendar,private modalService: NgbModal, private classService: ClassService, private classroomService: ClassroomService) {
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = {year: 2099, month: 12, day: 31};
    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';
    
    // setting datepicker popup to close only on click outside
    config.autoClose = 'outside';

    // setting datepicker popup to open above the input
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
    this.modalService.open(content, { centered: true }).result.then(() => {}, () => {})
  }

}
