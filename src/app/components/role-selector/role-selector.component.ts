import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css']
})
export class RoleSelectorComponent implements OnInit {
  role: string = "guest";
  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.setRole(this.role);
  }
  onChange(): void{
    this.roleService.setRole(this.role);
  }
}
