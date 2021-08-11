import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
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
  monday: Date = new Date();
  week: string[] = [];
  refresh = false;
  constructor(private dateService: DateService, private refreshService: RefreshService, private cdRef: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges) {
      this.monday = this.generateMonday();
      this.week = this.generateWeek();
  }
  ngOnInit(): void {
    this.generateDates();
    this.refreshService.refreshChange.subscribe(value => {this.refresh = value});
    this.refreshService.changeDetectionEmitter.subscribe(
      () => {
        this.cdRef.detectChanges();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  generateDates(){
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
