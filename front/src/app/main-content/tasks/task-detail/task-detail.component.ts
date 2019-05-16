import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { TaskService } from '../task.service';
import { Task } from 'src/models/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  providers: [TaskService],
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

	task: Task;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
	/**this.route.paramMap.subscribe(
		params => {
		  // (+) before `params.get()` turns the string into a number
		  const selectedId = +params.get('id');
		  this.getTaskById(selectedId);
		}
	);*/
	this.task = {idTask: 1, name: "test", description: "testunpeuplluslongenf", idOrga: 5};
  }

  getTaskById(id: number) {
	this.taskService.getTask(id)
	.subscribe(task => this.task = task);
  }

}
