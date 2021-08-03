import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/Schedule';
import { formatDate } from '@angular/common';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() weekNr = 0;
  monday: Date = new Date();
  fMonday: string = "";
  dayClasses: Schedule[] = [];
  daystring: string = "";
  constructor(private dateService: DateService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.monday = this.dateService.getMonday(this.weekNr);
    this.fMonday = formatDate(this.monday,'yyyy-MM-dd','en-US');
    this.scheduleService.getSchedulesByDate('localDate='+ this.fMonday).
    subscribe((dayClasses) => (this.dayClasses = dayClasses));
    console.log(this.daystring);
  }
  toString(){
    return JSON.stringify(this);
  }

}
