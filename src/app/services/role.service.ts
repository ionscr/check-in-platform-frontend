import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role: string = "";
  roleChange: Subject<string> = new Subject<string>();
  constructor() {
    this.roleChange.subscribe((value) => {
      this.role = value;
    });
   }
  setRole(role: string): void{
    this.role = role;
    this.roleChange.next(this.role);
  }
  getRole(): string{
    return this.role;
  }
}
