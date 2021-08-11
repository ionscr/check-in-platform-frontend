import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {NgbModal, NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ReservationsService } from 'src/app/services/reservations.service';
import { Reservations } from 'src/app/models/Reservations';
import { map } from 'rxjs/operators';
import { ClassService } from 'src/app/services/class.service';
import { Class } from 'src/app/models/Class';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  @Input() events: Observable<void>;
  @ViewChild('content') private content: TemplateRef<any>;
  private eventsSubsription: Subscription;
  faTimes = faTimes;
  users: User[] = [];
  reservations: Reservations[] = [];
  selectedUser!: User;
  classes: Class[] = [];
  first_name: string = "";
  last_name: string = "";
  role: number = 0;
  year: string = "0";
  department: string = "";
  section: string = "";
  group: string = "";


  constructor(private modalService: NgbModal, private userService: UserService, private reservationsService: ReservationsService, private classService: ClassService) { }

  ngOnInit(): void {
    this.eventsSubsription = this.events.subscribe(() => this.openModal(this.content));
  }
  openModal(content: TemplateRef<any>): void {
    this.clearParams();
    this.userService.getUsers().subscribe((users) => (this.users = users));
    this.modalService.open(content, { centered: true }).result.then((value) => {if(value==1) this.saveUser(); else if(value == 2) this.deleteUser()}, () => {})
  }
  saveUser(){
    const user: User = {first_name: this.first_name, last_name: this.last_name, role: this.role, year: Number(this.year), department: this.department, section: this.section, f_group: this.group};
    this.userService.addUser(user).subscribe();
    this.userService.getUsers().subscribe((users) => (this.users = users));
  }
  getReservations(){
    this.reservationsService.getReservations().pipe(
      map(reservations => 
        reservations.filter(reservations => reservations.student.id == this.selectedUser.id))
    ).subscribe((reservations) => (this.reservations = reservations));
  }
  getTeachedClasses(){
    this.classService.getClasses().pipe(
      map(classes => 
        classes.filter(classes => classes.teacher.id == this.selectedUser.id))
        ).subscribe((classes) => (this.classes = classes));
  }
  deleteUser(){
    this.getReservations();
    if(this.selectedUser.id  != undefined){
      this.reservations.forEach((reservation) => {
        if(reservation.id != undefined) this.reservationsService.deleteReservation(reservation.id);
    });
    this.getTeachedClasses();
    if(this.selectedUser.id != undefined){
      this.classes.forEach((class1) => {
        if(class1.id != undefined) this.classService.deleteClass(class1.id);
      }
      )
    }
      this.userService.deleteUser(this.selectedUser.id).subscribe();
      this.users.filter((user) => user.id != this.selectedUser.id);
    }
  }
  clearParams(){
  this.first_name = "";
  this.last_name = "";
  this.role = 0;
  this.year = "0";
  this.department = "";
  this.section = "";
  this.group = "";
  }
}
