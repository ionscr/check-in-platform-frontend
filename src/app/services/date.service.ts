import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DateService {
  currentDate: Date = new Date();
  constructor() { }
  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
  getMonday(weekNr: number){
    var monday = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay() + (this.currentDate.getDay() == 0 ? -6:1)));
    return this.addDays(monday, weekNr*7);
  }
  getFriday(weekNr: number){
    var friday = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay() + (this.currentDate.getDay() == 0 ? -6:1) + 4));
    return this.addDays(friday, weekNr*7);
  } 
}
