import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Schedule } from '../models/Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiServerUrl}/schedule/all`);
  }
  public getSchedulesByDate(date: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.apiServerUrl}/schedule/date/?${date}`);
  }
  public addSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.apiServerUrl}/schedule/add`, schedule);
  }
  public updateSchedule(schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiServerUrl}/schedule/update`, schedule);
  }
  public deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/schedule/delete/${id}`);
  }
}
