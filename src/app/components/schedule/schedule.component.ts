import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { formatDate } from '@angular/common';
import { SimpleChanges } from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnChanges {
  @Input() weekNr = 0;
  @Input() refresh = 0;
  monday: Date = new Date();
  week: string[] = [];
  constructor(private dateService: DateService, private refreshService: RefreshService) { }
  ngOnChanges(changes: SimpleChanges) {
    this.monday = this.generateMonday();
    this.week = this.generateWeek();
    if(changes.refresh.currentValue==1){
      this.generateDates();
    }
}
  ngOnInit(): void {
    this.generateDates();
  }
  generateDates(){
    this.monday = this.generateMonday();
    this.week = this.generateWeek();
    this.refreshService.setRefresh(0);
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
