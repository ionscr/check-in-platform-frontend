import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { RoleSelectorComponent } from './components/role-selector/role-selector.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ArraySortPipe, ScheduleDayComponent } from './components/schedule-day/schedule-day.component';
import { ScheduleItemComponent } from './components/schedule-item/schedule-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GuestModalComponent } from './components/modals/guest-modal/guest-modal.component';
import { StudentModalComponent } from './components/modals/student-modal/student-modal.component';
import { TeacherModalComponent } from './components/modals/teacher-modal/teacher-modal.component';
import { AdminModalComponent } from './components/modals/admin-modal/admin-modal.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { NewScheduleModalComponent } from './components/modals/new-schedule-modal/new-schedule-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RoleSelectorComponent,
    CalendarComponent,
    ScheduleComponent,
    ScheduleDayComponent,
    ScheduleItemComponent,
    ArraySortPipe,
    GuestModalComponent,
    StudentModalComponent,
    TeacherModalComponent,
    AdminModalComponent,
    FilterPipePipe,
    NewScheduleModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
