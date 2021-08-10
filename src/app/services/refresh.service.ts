import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  refresh: number = 0;
  refreshChange: Subject<number> = new Subject<number>();
  constructor() {
    this.refreshChange.subscribe((value) => {
      this.refresh = value;
    });
   }
  setRefresh(refresh: number): void{
    this.refresh = refresh;
    this.refreshChange.next(this.refresh);
  }
  getRefresh(): number{
    return this.refresh;
  }
}
