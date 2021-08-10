import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ClassService } from 'src/app/services/class.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { Classroom } from 'src/app/models/Classroom';
import { Class } from 'src/app/models/Class';
@Component({
  selector: 'app-new-schedule-modal',
  templateUrl: './new-schedule-modal.component.html',
  styleUrls: ['./new-schedule-modal.component.css']
})
export class NewScheduleModalComponent implements OnInit {
  @Input() events: Observable<void>;
  @Input() day: number = -1;
  @ViewChild('content') private content: TemplateRef<any>;
  private eventsSubsription: Subscription;
  faTimes=faTimes;
  classrooms: Classroom[] = [];
  classes: Class[] = [];
  selectedClass!: Class;
  selectedClassroom!: Classroom;
 
  constructor(private modalService: NgbModal, private classService: ClassService, private classroomService: ClassroomService) { }

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
