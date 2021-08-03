import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { formatDate } from '@angular/common';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { faBackward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weekNr: number = 0;
  monday: string = "";
  friday: string = "";
  faForward = faForward;
  faBackward = faBackward;
  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.monday = this.formatMonday();
    this.friday = this.formatFriday();
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
}
