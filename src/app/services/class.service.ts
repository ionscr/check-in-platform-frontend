import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Class } from '../models/Class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.apiServerUrl}/class/all`);
  }
  public addClass(class1: Class): Observable<Class> {
    return this.http.post<Class>(`${this.apiServerUrl}/class/add`, class1);
  }
  public updateClass(class1: Class): Observable<Class> {
    return this.http.put<Class>(`${this.apiServerUrl}/class/update`, class1);
  }
  public deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/class/delete/${id}`);
  }
}
