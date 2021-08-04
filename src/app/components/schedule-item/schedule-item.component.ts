import { Component, OnInit, Input } from '@angular/core';
import { Reservations } from 'src/app/models/Reservations';
import { Schedule } from 'src/app/models/Schedule';
import { ReservationsService } from 'src/app/services/reservations.service';
import { map, filter } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrls: ['./schedule-item.component.css']
})
export class ScheduleItemComponent implements OnInit {

  @Input() dayClass: Schedule;
  reservations: Reservations[] = [];
  capacity: number = 0;
  constructor(private reservationsService: ReservationsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getReservations();
  }
  getReservations(): void {
    this.reservationsService.getReservations().pipe(
      map(reservations => 
        reservations.filter(reservation => reservation.schedule.id == this.dayClass.id))
      ).subscribe((reservations) => (this.reservations = reservations, this.capacity = reservations.length));
  }
  openModal(content: TemplateRef<any>): void {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
}
