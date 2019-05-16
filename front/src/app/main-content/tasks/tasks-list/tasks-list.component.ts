import { Component, OnInit } from '@angular/core';
import { Task } from '../../../../models/task';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  providers: [TaskService],
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

	tasks: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
	  //this.getTasks();
	  this.tasks = [
		  {idTask: 1, name: "Test", description: "TEst ibeifbzrng", idOrga: 2},
		  {idTask: 2, name: "Test2", description: "TEst2 ibeifbzrng", idOrga: 3}
	  ]
  }

  getTasks(): void {
    this.taskService.getAllTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

}
