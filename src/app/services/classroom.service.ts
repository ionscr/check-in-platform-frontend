import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Classroom } from '../models/Classroom';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${this.apiServerUrl}/classroom/all`);
  }
  public addClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(`${this.apiServerUrl}/classroom/add`, classroom);
  }
  public updateClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.apiServerUrl}/classroom/update`, classroom);
  }
  public deleteClassroom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/classroom/delete/${id}`);
  }
}
