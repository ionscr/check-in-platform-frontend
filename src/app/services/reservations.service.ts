import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservations } from '../models/Reservations';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getReservations(): Observable<Reservations[]> {
    return this.http.get<Reservations[]>(`${this.apiServerUrl}/reservations/all`);
  }
  public addReservation(reservation: Reservations): Observable<Reservations> {
    return this.http.post<Reservations>(`${this.apiServerUrl}/reservations/add`, reservation);
  }
  public updateReservation(reservation: Reservations): Observable<Reservations> {
    return this.http.put<Reservations>(`${this.apiServerUrl}/reservations/update`, reservation);
  }
  public deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/reservations/delete/${id}`);
  }
}
