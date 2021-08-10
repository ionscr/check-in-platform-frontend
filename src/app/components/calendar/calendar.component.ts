import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

import { DateService } from 'src/app/services/date.service';
import { RoleService } from 'src/app/services/role.service';

import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  plusEventSubject: Subject<void> = new Subject<void>();
  weekNr: number = 0;
  monday: string = "";
  friday: string = "";
  role: string = "";
  faForward = faForward;
  faBackward = faBackward;
  faPlus = faPlus;
  day: number = 0;
  constructor(private dateService: DateService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.monday = this.formatMonday();
    this.friday = this.formatFriday();
    this.roleService.roleChange.subscribe(value => {this.role = value})
  }
  formatMonday(): string{
    return formatDate(this.dateService.getMonday(this.weekNr),'dd.MM','en-US');
  }
  formatFriday(): string{
    return formatDate(this.dateService.getFriday(this.weekNr),'dd.MM','en-US');
  }
  onForward(){
    this.weekNr++;
    this.monday = this.formatMonday();
    this.friday = this.formatFriday();
  }
  onBackwards(){
    this.weekNr--;
    this.monday = this.formatMonday();
    this.friday = this.formatFriday();
  }
  onPlus(day: number){
    this.day = day;
    this.plusEventSubject.next();
  }
}
