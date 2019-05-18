import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
	  TasksComponent,
	  TasksListComponent,
	  TaskDetailComponent
  ],
  imports: [
	CommonModule,
	FormsModule,
    TasksRoutingModule
  ],
  exports: [
	  TasksComponent
  ]
})
export class TasksModule { }
