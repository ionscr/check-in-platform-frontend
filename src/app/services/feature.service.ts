import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feature } from '../models/Feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getFeatures(): Observable<Feature[]> {
    return this.http.get<Feature[]>(`${this.apiServerUrl}/feature/all`);
  }
  public addFeature(feature: Feature): Observable<Feature> {
    return this.http.post<Feature>(`${this.apiServerUrl}/feature/add`, feature);
  }
  public updateFeature(feature: Feature): Observable<Feature> {
    return this.http.put<Feature>(`${this.apiServerUrl}/feature/update`, feature);
  }
  public deleteFeature(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/feature/delete/${id}`);
  }
}
