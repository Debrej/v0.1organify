import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component';
import { DefaultViewComponent } from './default-view/default-view.component';
import { DashbordComponent } from './main-content/dashbord/dashbord.component';
import { TasksComponent } from './main-content/tasks/tasks.component';
import { CalendarComponent } from './main-content/calendar/calendar.component';
import { TaskDetailComponent } from './main-content/tasks/task-detail/task-detail.component';

const appRoutes: Routes = [
	{ path: 'login', component: LoginViewComponent},
	{ path: 'test', component: DefaultViewComponent},
	{ path: '', component: LoginViewComponent},
	{ 
		path: 'dashboard',
		component: DefaultViewComponent,
		children: [
			{
				path: '',
				component: DashbordComponent
			}
		]
	},
	{
		path: 'tasks',
		component: DefaultViewComponent,
		children: [
			{
				path: '',
				component: TasksComponent,
				children: [
					{	
						path: ':id',
						component: TaskDetailComponent
					} 
				]
			}
		]
	},
	{
		path: 'calendar',
		component: DefaultViewComponent,
		children: [
			{
				path: '',
				component: CalendarComponent
			}
		]
	}
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
