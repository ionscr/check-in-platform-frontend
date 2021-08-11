import { ChangeDetectorRef, EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  refresh: boolean = false;
  refreshChange: Subject<boolean> = new Subject<boolean>();
  changeDetectionEmitter: EventEmitter<void> = new EventEmitter<void>();
  constructor() {
    this.refreshChange.subscribe((value) => {
      this.refresh = value;
    });
   }
   setRefresh(refresh: boolean){
     console.log(refresh);
     this.refresh = refresh;
     this.refreshChange.next(this.refresh);
     this.changeDetectionEmitter.emit();
   }
}
