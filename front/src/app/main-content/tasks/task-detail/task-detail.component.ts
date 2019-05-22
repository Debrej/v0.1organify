import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from 'src/models/task';
import { Orga } from 'src/models/orga';
import { Subshift } from 'src/models/subshift';
import { OrgaService } from '../../orgas/orga.service';
import { SubshiftService } from '../../shifts/subshift.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  providers: [TaskService],
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

	task: Task;
	update: boolean;
	create: boolean;
	orgas: Orga[];
	addedOrga: number;
	allOrgas: Orga[];
	subshifts: Subshift[];
	allSubshifts : Subshift[];
	startdate: string;
	enddate: string;
	starthour: string;
	endhour: string;
	optionHidden: boolean = true;

  constructor(private taskService: TaskService, private orgaService: OrgaService, private subshiftService: SubshiftService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
	this.route.paramMap.subscribe(
		params => {
		  // (+) before `params.get()` turns the string into a number
		  const selectedId = +params.get('id');
		  const action = params.get('action');
		  if(!selectedId) {
			  this.create = true;
			  this.update = true;
			} else {
				this.create = false;
				if(!action) {
					this.update = false;
				} else {
					this.update = true;
				}
				this.getTaskById(selectedId);
		  		this.getOrgas(selectedId);
		  		this.getSubshifts(selectedId);
			}
		}
	);
	if(!this.create) {
		this.getAllOrgas(); 
	} else {
		this.getAllOrgas();
	}
	this.getAllSubshifts();
  }

  getTaskById(id: number) {
	this.taskService.getTask(id)
	.subscribe(res => {
		if (res.status == 0) {
			this.task = res.task;
		}
	});
  }

  getOrgas(id: number) {
	  this.taskService.getAllTaskOrgas(id)
	  .subscribe(res => {
		  if (res.status == 0) {
			this.orgas = res.orga;
		}
		});
  }

  getSubshifts(id: number) {
	  this.taskService.getTaskShift(id)
	  .subscribe(res => {
		  if (res.status == 0) {
			this.subshifts = res.subshift;
		  }
	  });
  }

  getAllSubshifts() {
	  this.subshiftService.getAllSubshifts()
	  .subscribe(res => {
		  if (res.status == 0) {
			  this.allSubshifts = res.subshift;
		  }
	  });
  }

  getAllOrgas() {
	this.orgaService.getAllOrgas()
	.subscribe(res => {
		if (res.status == 0) {
			if(this.create) {
				this.orgas = res.orga
			} else {
				this.allOrgas = res.orga;
			}
		}
	});
  }

  deleteOrga(id: number) {
	this.taskService.deleteTaskOrga(this.task.idTask, id)
	.subscribe(res => {
		if (res.status == 0) {
			this.router.navigateByUrl('/tasks/' + this.task.idTask);
		}
	});
  }

  deleteSubshift(id: number) {
	  this.taskService.deleteTaskSubshift(this.task.idTask, id)
	  .subscribe(res => {
		if (res.status == 0) {
			this.router.navigateByUrl('/tasks/' + this.task.idTask);
		}
	  });
  }

  deleteTask() {
	  this.taskService.deleteTask(this.task.idTask)
	  .subscribe(res => {
		if (res.status == 0) {
			this.router.navigateByUrl('/tasks');
		}
	  });
  }

  addOrga() {
	this.orgaService.assignTaskToOrga(this.addedOrga, this.task.idTask)
	.subscribe(res => {
		if (res.status == 0) {
			this.router.navigateByUrl('/tasks/' + this.task.idTask);
		}
	});
  }

  onSubmit() {
	const body = {name: this.task.name, description: this.task.description};
	  const idStart = this.subshifts[0].idSubshift;
	  const idEnd = this.subshifts[this.subshifts.length - 1].idSubshift;
	  this.taskService.createTask(idStart, idEnd, this.task.idOrga, body)
	  .subscribe(res => {
		  if(res.status == 0) {
			this.router.navigateByUrl('/tasks/' + res.task.idOrga);
		  }
		});
	this.router.navigateByUrl('/tasks');
  }

}
