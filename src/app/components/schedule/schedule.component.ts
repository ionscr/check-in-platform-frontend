import { Component, OnInit, Input } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() weekNr = 0;
  monday: Date = new Date();
  week: string[] = [];
  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    this.monday = this.dateService.getMonday(this.weekNr);
    for(var i = 0;i < 5; i++) this.week.push(formatDate(this.dateService.addDays(this.monday,i),'yyyy-MM-dd','en-US'));
  }

}
