import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RefreshService } from 'src/app/services/refresh.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { Classroom } from 'src/app/models/Classroom';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Schedule } from 'src/app/models/Schedule';
import { map } from 'rxjs/operators';
import { Reservations } from 'src/app/models/Reservations';
import { FeatureService } from 'src/app/services/feature.service';
import { Feature } from 'src/app/models/Feature';

@Component({
  selector: 'app-manage-classrooms',
  templateUrl: './manage-classrooms.component.html',
  styleUrls: ['./manage-classrooms.component.css']
})
export class ManageClassroomsComponent implements OnInit {
  @Input() events: Observable<void>;
  @ViewChild('content') private content: TemplateRef<any>;
  private eventsSubsription: Subscription;
  classrooms: Classroom[] = [];
  schedules: Schedule[] = [];
  reservations: Reservations[] = [];
  features: Feature[] = [];
  selectedClassroom!: Classroom;
  updatedClassroom!: Classroom;
  classroom_name: string = "";
  classroom_location: string = "";
  classroom_capacity: number = 0;
  update_classroom_name: string = "";
  update_classroom_location: string = "";
  update_classroom_capacity: number = 0;
  featureClassroom!: Classroom;
  feature_name: string = "";
  selectedFeature!: Feature;
  faTimes = faTimes;

  constructor(private scheduleService: ScheduleService, private reservationService: ReservationsService ,private refreshService: RefreshService ,private modalService: NgbModal, private classroomService: ClassroomService, private featureService: FeatureService) { }

  ngOnInit(): void {
    this.eventsSubsription = this.events.subscribe(() => this.openModal(this.content));
  }
  ngOnDestroy(): void{
    this.eventsSubsription.unsubscribe();
  }
  openModal(content: TemplateRef<any>): void {
    this.clearParams();
    this.getClassrooms();
    this.getFeatures();
    this.scheduleService.getSchedules().subscribe((schedules) => (this.schedules = schedules));
    this.reservationService.getReservations().subscribe((reservations) => (this.reservations = reservations));
    this.modalService.open(content, { centered: true, size: 'lg' }).result.then((value) => {if(value == 1) this.addClassroom(); if(value == 2) this.updateClassroom(); if(value == 3) this.deleteClassroom();}, () => {this.requestRefresh()})
  }
  getClassrooms(){
    this.classroomService.getClassrooms().subscribe((classrooms) => (this.classrooms = classrooms));
  }
  getFeatures(){
    this.featureService.getFeatures().subscribe((features) => (this.features = features));
  }
  addClassroom(){
    const classroom: Classroom = {name: this.classroom_name, location: this.classroom_location, capacity: Number(this.classroom_capacity) };
    this.classroomService.addClassroom(classroom).subscribe();
    this.getClassrooms();
  }
  updateClassroom(){
    this.updatedClassroom.name = this.update_classroom_name;
    this.updatedClassroom.location = this.update_classroom_location;
    this.updatedClassroom.capacity = Number(this.update_classroom_capacity);
    this.classroomService.updateClassroom(this.updatedClassroom).subscribe();
  }
  deleteSchedulesByClassroom(){
    var selectedSchedules: Schedule[] = [];
    var selectedReservations: Reservations[] = [];
    this.reservations.forEach((reservation) => {if(reservation.schedule.classroom.id == this.selectedClassroom.id) selectedReservations.push(reservation);});
    this.schedules.forEach((schedule) => {if(schedule.classroom.id == this.selectedClassroom.id) selectedSchedules.push(schedule)});
    selectedReservations.forEach((reservation) => {this.reservationService.deleteReservation(reservation.id).subscribe()});
    selectedSchedules.forEach((schedule) => {this.scheduleService.deleteSchedule(schedule.id).subscribe()});
  }
  deleteFeaturesByClassroom(){
    var selectedFeatures: Feature[] = [];
    this.features.forEach((feature) => {if(feature.classroom.id == this.selectedClassroom.id) selectedFeatures.push(feature);});
    selectedFeatures.forEach((feature) => {this.featureService.deleteFeature(feature.id).subscribe();});
  }
  addFeature(){
    const feature: Feature = {feature: this.feature_name, classroom: this.featureClassroom};
    this.featureService.addFeature(feature).subscribe((feature) => this.features.push(feature));
    this.feature_name = "";
  }
  deleteFeature(){
    if(this.selectedFeature){
      this.featureService.deleteFeature(Number(this.selectedFeature.id)).subscribe();
    }
    this.getFeatures();
  }
  deleteClassroom(){
    if(this.selectedClassroom != null && this.selectedClassroom != undefined){
    this.deleteSchedulesByClassroom();
    this.deleteFeaturesByClassroom();
    this.classroomService.deleteClassroom(Number(this.selectedClassroom.id)).subscribe();
    this.requestRefresh();
    }
  }
  requestRefresh(){
    this.refreshService.setRefresh(true);
    this.refreshService.setRefresh(false);
  }
  clearParams(){
    this.updatedClassroom = null;
    this.selectedClassroom = null;
    this.featureClassroom = null;
    this.selectedFeature = null;
    this.classroom_name = "";
    this.classroom_location = "";
    this.classroom_capacity = 0;
    this.update_classroom_name = "";
    this.update_classroom_location = "";
    this.update_classroom_capacity = 0;
    this.feature_name = "";
  }
  filterFeature(): any[]{
    var features = this.features;
    return features.filter(i => i.classroom.id == this.featureClassroom.id);
  }
}
