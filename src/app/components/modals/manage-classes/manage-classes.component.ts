import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RefreshService } from 'src/app/services/refresh.service';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models/Class';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ThrowStmt } from '@angular/compiler';
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
  updatedClass: Class;
  selectedClass: Class;
  class_name: string = "";
  class_year: number = 0;
  class_section: string = "";
  class_teacher!: User;
  update_class_name: string;
  update_class_year: number;
  update_class_section: string;
  update_class_teacher: User;
  faTimes = faTimes;

  constructor(private refreshService: RefreshService ,private modalService: NgbModal, private classService: ClassService, private userService: UserService) { }

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
    this.modalService.open(content, { centered: true }).result.then((value) => {if(value == 1) this.addClass(); if(value == 2) this.updateClass()}, () => {this.requestRefresh()})
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
    this.getClasses();
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
