import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentRoutingModule } from './main-content-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MainContentComponent } from './main-content.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TasksModule } from './tasks/tasks.module';
import { OrgasModule } from './orgas/orgas.module';
import { ShiftsModule } from './shifts/shifts.module';
import { InfosComponent } from './infos/infos.component';
import { AffectationComponent } from './affectation/affectation.component';

@NgModule({
  declarations: [
	MainContentComponent,
	DashbordComponent,
	CalendarComponent,
	InfosComponent,
	AffectationComponent
],
  imports: [
	CommonModule,
	FullCalendarModule,
	TasksModule,
	OrgasModule,
	ShiftsModule,
    MainContentRoutingModule
  ],
  exports: [
	  MainContentComponent
  ]
})
export class MainContentModule { }
