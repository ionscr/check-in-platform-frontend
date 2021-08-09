import { Component, OnInit, Input } from '@angular/core';
import { Reservations } from 'src/app/models/Reservations';
import { Schedule } from 'src/app/models/Schedule';
import { Feature } from 'src/app/models/Feature';

import { ReservationsService } from 'src/app/services/reservations.service';
import { RoleService } from 'src/app/services/role.service';
import { FeatureService } from 'src/app/services/feature.service';

import { map } from 'rxjs/operators';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {
  @Input() dayClass!: Schedule;
  reservations: Reservations[] = [];
  features: Feature[] = [];
  role: string = "";
  capacity: number = 0;
  faTimes = faTimes;
  guestEventSubject: Subject<void> = new Subject<void>();
  studentEventSubject: Subject<void> = new Subject<void>();
  teacherEventSubject: Subject<void> = new Subject<void>();
  adminEventSubject: Subject<void> = new Subject<void>();

  constructor(private reservationsService: ReservationsService, private roleService: RoleService, private featureService: FeatureService
    ) { }

  ngOnInit(): void {
    this.getReservations();
    this.getFeatures();
  }
  getReservations(): void {
    this.reservationsService.getReservations().pipe(
      map(reservations => 
        reservations.filter(reservation => reservation.schedule.id == this.dayClass.id))
      ).subscribe((reservations) => (this.reservations = reservations, this.capacity = reservations.length));
  }
  getFeatures(): void {
    this.featureService.getFeatures().pipe(
      map(features => 
        features.filter(feature => feature.classroom.id == this.dayClass.classroom.id))
    ).subscribe((features) => (this.features = features));
  }
  updateReservations(): void{
    this.reservationsService.getReservations().subscribe((reservations) => (this.reservations = reservations));
    this.getReservations();
  }
  callModal(){
    this.role = this.roleService.getRole();
    if(this.role == 'guest') this.guestEventSubject.next();
    if(this.role == 'student') this.studentEventSubject.next();
    if(this.role == 'teacher') this.teacherEventSubject.next();
    if(this.role == 'admin') this.adminEventSubject.next();
  }
}
