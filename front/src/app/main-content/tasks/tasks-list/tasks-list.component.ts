import { Component, OnInit } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../task.service';
import { OrgaService } from '../../orgas/orga.service';
import { Orga } from 'src/models/orga';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  providers: [TaskService],
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

	tasks: Task[];
	orgas: Orga[];
	update: boolean;

  constructor(private taskService: TaskService, private orgaService: OrgaService, private route: ActivatedRoute) {}

  ngOnInit() {

	this.route.paramMap.subscribe(
		params => {
		  // (+) before `params.get()` turns the string into a number
		  const selectedId = +params.get('id');
		  if(!selectedId) {this.update = true;} else {this.update=false;}
		}
	);

	  this.getTasks();
  }

  getTasks(): void {
    this.taskService.getAllTasks()
      .subscribe(res => {
		  if(res.status == 0) {
			this.tasks = res.task;
			this.getOrgas();
		  }
		});
  }

  getOrgas(): void {
	  for (let i=0; i < this.tasks.length; i++) {
		  this.orgaService.getOrga(this.tasks[i].idOrga)
		  .subscribe(res => {
			  if (res.status == 0) {
				  this.orgas[i] = res.orga;
			  }
			});
	  }
  }

}
