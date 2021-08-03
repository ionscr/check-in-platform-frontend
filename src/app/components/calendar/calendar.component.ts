import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weekNr: number = 0;
  monday: Date = new Date();
  friday: Date = new Date();
  fMonday: string = "";
  fFriday: string = "";
  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.monday = this.dateService.getMonday(this.weekNr);
    this.friday = this.dateService.getFriday(this.weekNr);
    this.fMonday = formatDate(this.monday,'dd.MM','en-US');
    this.fFriday = formatDate(this.friday,'dd.MM','en-US');
  }

}
