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
import { RefreshService } from 'src/app/services/refresh.service';


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
  updatedUser!: User;
  classes: Class[] = [];
  first_name: string = "";
  last_name: string = "";
  role: number = 0;
  year: number = 0;
  department: string = "";
  section: string = "";
  f_group: string = "";
  update_first_name: string;
  update_last_name: string;
  update_role: number;
  update_year: number;
  update_department: string;
  update_section: string;
  update_f_group: string;
  constructor(private refreshService: RefreshService ,private modalService: NgbModal, private userService: UserService, private reservationsService: ReservationsService, private classService: ClassService) { }

  ngOnInit(): void {
    this.eventsSubsription = this.events.subscribe(() => this.openModal(this.content));
  }
  openModal(content: TemplateRef<any>): void {
    this.clearParams();
    this.userService.getUsers().subscribe((users) => (this.users = users));
    this.modalService.open(content, { centered: true }).result.then((value) => {if(value==1) this.saveUser(); else if(value == 2) this.updateUser(); else if(value == 3) this.deleteUser()}, () => {this.requestRefresh()})
  }
  saveUser(){
    const user: User = {first_name: this.first_name, last_name: this.last_name, role: Number(this.role), year: Number(this.year), department: this.department, section: this.section, group: this.f_group};
    this.userService.addUser(user).subscribe();
    this.users.push(user);
    this.requestRefresh();
  }
  getReservations(){
    this.reservationsService.getReservations().pipe(
      map(reservations => 
        reservations.filter(reservation => reservation.student.id == this.selectedUser.id))
    ).subscribe((reservations) => (this.reservations = reservations));
  }
  getTeachedClasses(){
    this.classService.getClasses().pipe(
      map(classes => 
        classes.filter(class1 => class1.teacher.id == this.selectedUser.id))
        ).subscribe((classes) => (this.classes = classes));
  }
  deleteUser(){
    this.getReservations();
    if(this.selectedUser.id  != undefined){
      this.reservations.forEach((reservation) => {
        console.log(reservation);
        if(reservation.id != undefined) this.reservationsService.deleteReservation(reservation.id).subscribe();
    });
    this.getTeachedClasses();
    if(this.selectedUser.id != undefined){
      this.classes.forEach((class1) => {
        console.log("class = ");
        console.log(class1);
        if(class1.id != undefined) this.classService.deleteClass(class1.id).subscribe();
      }
      )
    }
      this.userService.deleteUser(this.selectedUser.id).subscribe();
      this.users.filter((user) => user.id != this.selectedUser.id);
    }
    this.requestRefresh();
  }
  updateUser(){
    this.updatedUser.first_name = this.update_first_name;
    this.updatedUser.last_name = this.update_last_name;
    this.updatedUser.role = this.update_role;
    this.updatedUser.year = this.update_year;
    this.updatedUser.department = this.update_department;
    this.updatedUser.section = this.update_section;
    this.updatedUser.group = this.update_f_group;
    this.userService.updateUser(this.updatedUser).subscribe();
    this.requestRefresh;
  }
  clearParams(){
  this.first_name = "";
  this.last_name = "";
  this.role = 0;
  this.year = 0;
  this.department = "";
  this.section = "";
  this.f_group = "";
  this.updatedUser = null;
  this.update_first_name = "";
  this.update_last_name = "";
  this.update_role = 0;
  this.update_year = 0;
  this.update_department = "";
  this.update_section = "";
  this.update_f_group = "";
  }
  requestRefresh(){
    this.refreshService.setRefresh(true);
    this.refreshService.setRefresh(false);
  }
}
