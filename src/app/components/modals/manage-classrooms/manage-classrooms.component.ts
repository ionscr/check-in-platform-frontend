import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-classrooms',
  templateUrl: './manage-classrooms.component.html',
  styleUrls: ['./manage-classrooms.component.css']
})
export class ManageClassroomsComponent implements OnInit {
  @Input() events: Observable<void>;
  constructor() { }

  ngOnInit(): void {
  }

}
