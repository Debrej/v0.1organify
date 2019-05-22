import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component';
import { DefaultViewComponent } from './default-view/default-view.component';
import { DashbordComponent } from './main-content/dashbord/dashbord.component';
import { TasksComponent } from './main-content/tasks/tasks.component';
import { CalendarComponent } from './main-content/calendar/calendar.component';
import { TaskDetailComponent } from './main-content/tasks/task-detail/task-detail.component';
import { OrgasComponent } from './main-content/orgas/orgas.component';
import { OrgaDetailComponent } from './main-content/orgas/orga-detail/orga-detail.component';
import { ShiftsComponent } from './main-content/shifts/shifts.component';
import { ShiftDetailComponent } from './main-content/shifts/shift-detail/shift-detail.component';
import { InfosComponent } from './main-content/infos/infos.component';
import {FormLoginComponent} from "./form-login/form-login.component";
import {PhotoLoginComponent} from "./photo-login/photo-login.component";

const appRoutes: Routes = [
	{ path: 'login',
    component: LoginViewComponent,
    children: [
      {
        path: '',
        component: FormLoginComponent
      },
      {
        path: '',
        component: PhotoLoginComponent
      }
    ]
  },
	{
	  path: '',
    component: LoginViewComponent,
    children: [
      {
        path: '',
        component: FormLoginComponent
      },
      {
        path: '',
        component: PhotoLoginComponent
      }
    ]
  },
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
					},
					{
						path: ':id/:action',
						component: TaskDetailComponent
					}
				]
			},
			{
				path: 'create',
				component: TasksComponent
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
	},
	{
		path: 'orgas',
		component: DefaultViewComponent,
		children: [
			{
				path: '',
				component: OrgasComponent,
				children: [
					{
						path: ':id',
						component: OrgaDetailComponent
					},
					{
						path: ':id/:action',
						component: OrgaDetailComponent
					}
				]
			},
			{
				path: 'create',
				component: OrgasComponent
			}
		]
	},
	{
		path: 'shifts',
		component : DefaultViewComponent,
		children: [
			{
				path: '',
				component: ShiftsComponent,
				children: [
					{
						path: ':id',
						component: ShiftDetailComponent
					},
					{
						path: ':id/:action',
						component: ShiftDetailComponent
					}
				]
			},
			{
				path: 'create',
				component: ShiftsComponent
			}
		]
	},
	{
		path: 'infos',
		component: DefaultViewComponent,
		children: [
			{
				path: '',
				component: InfosComponent
			}
		]
	}
  ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
