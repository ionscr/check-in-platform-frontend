import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  role: string = "";
  constructor() { }
  setRole(role: string): void{
    this.role = role;
  }
  getRole(): string{
    return this.role;
  }
}
