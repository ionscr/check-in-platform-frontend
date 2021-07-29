import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css']
})
export class RoleSelectorComponent implements OnInit {
  role: string = "guest";
  constructor() { }

  ngOnInit(): void {
  }
}
