import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentRoutingModule } from './main-content-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MainContentComponent } from './main-content.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TasksModule } from './tasks/tasks.module';

@NgModule({
  declarations: [
	MainContentComponent,
	DashbordComponent,
	CalendarComponent
],
  imports: [
	CommonModule,
	FullCalendarModule,
	TasksModule,
    MainContentRoutingModule
  ],
  exports: [
	  MainContentComponent
  ]
})
export class MainContentModule { }
