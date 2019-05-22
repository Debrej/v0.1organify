import { NgModule } from '@angular/core';
import { Routes, RouterModule, OutletContext } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';
import { TasksComponent } from './tasks/tasks.component';
import { MainContentComponent } from './main-content.component';

const mainContentRoutes: Routes = [
	
];

@NgModule({
  imports: [RouterModule.forChild(mainContentRoutes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }
