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

	  //this.getTasks();
	  this.tasks = [
		  {idTask: 1, name: "Test", description: "TEst ibeifbzrng", idOrga: 2},
		  {idTask: 2, name: "Test2", description: "TEst2 ibeifbzrng", idOrga: 3}
	  ]
	  //this.getOrgas();
	  this.orgas = [new Orga(2, 'Michel', 'Blanc', 'faisonscommeca@gmail.com'), new Orga(3, 'Patrice', 'Duchemein', 'vivelesaucisson@gmail.com')]
  }

  getTasks(): void {
    this.taskService.getAllTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  getOrgas(): void {
	  for (let i=0; i < this.tasks.length; i++) {
		  this.orgaService.getOrga(this.tasks[i].idOrga)
		  .subscribe(orga => this.orgas[i]);
	  }
  }

}
