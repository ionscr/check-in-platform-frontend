import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { formatDate } from '@angular/common';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnChanges {
  @Input() weekNr = 0;
  monday: Date = new Date();
  week: string[] = [];
  constructor(private dateService: DateService) { }
  ngOnChanges(changes: SimpleChanges) {
    this.monday = this.generateMonday();
    this.week = this.generateWeek();

}
  ngOnInit(): void {
    this.monday = this.generateMonday();
    this.week = this.generateWeek();
  }
  generateMonday(): Date {
    return this.dateService.getMonday(this.weekNr);
  }
  generateWeek(): string[] {
    var week: string[] = [];
    for(var i = 0;i < 5; i++) week.push(formatDate(this.dateService.addDays(this.monday,i),'yyyy-MM-dd','en-US'));
    return week;
  }

}
