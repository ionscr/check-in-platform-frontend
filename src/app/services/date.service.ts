import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DateService {
  weekNr: number = 0;
  currentDate: Date = new Date();
  constructor() { }
  getMonday(weekNr: number){
    return  new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay() + (this.currentDate.getDay() == 0 ? -6:1) + (this.currentDate.getDay() == 6 ? -5:0) + 7*weekNr));
  }
  getFriday(weekNr: number){
    return  new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay() + (this.currentDate.getDay() == 0 ? -6:1) + (this.currentDate.getDay() == 6 ? -5:0) + 4 + 7*weekNr));
  } 
}
