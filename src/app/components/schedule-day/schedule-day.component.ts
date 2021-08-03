import { Component, OnInit, Input } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/Schedule';
@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.css']
})
export class ScheduleDayComponent implements OnInit {
  @Input() today: string = "";
  dayClasses: Schedule[] = [];
  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleService.getSchedulesByDate('localDate='+ this.today).
    subscribe((dayClasses) => (this.dayClasses = dayClasses));
  }

}
