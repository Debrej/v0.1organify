import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

@NgModule({
  declarations: [
	  TasksComponent,
	  TasksListComponent,
	  TaskDetailComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule
  ],
  exports: [
	  TasksComponent
  ]
})
export class TasksModule { }
