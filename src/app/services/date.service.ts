import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DateService {
  weekNr: number = 0;
  currentDate: Date = new Date();
  constructor() { }
  getMonday(weekNr: number){
    return  new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay()) + weekNr * 8);
  }
}
