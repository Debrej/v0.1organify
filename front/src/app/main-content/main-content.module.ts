import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentRoutingModule } from './main-content-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MainContentComponent } from './main-content.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TasksModule } from './tasks/tasks.module';
import { OrgasModule } from './orgas/orgas.module';

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
	OrgasModule,
    MainContentRoutingModule
  ],
  exports: [
	  MainContentComponent
  ]
})
export class MainContentModule { }
