import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from 'src/models/task';
import { Orga } from 'src/models/orga';
import { Subshift } from 'src/models/subshift';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  providers: [TaskService],
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

	task: Task;
	create: boolean;
	orgas: Orga[];
	subshifts: Subshift[];
	startdate: string;
	enddate: string;
	starthour: string;
	endhour: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap.subscribe(
		params => {
		  // (+) before `params.get()` turns the string into a number
		  const selectedId = +params.get('id');
		  if(!selectedId) {this.create = true;} else {this.create=false;}
		  //this.getTaskById(selectedId);
		  //this.getOrgas(selectedId);
		  //this.getSubshifts(selectedId);
		}
	);
	this.orgas = [new Orga(1, "Jean", "Papon", "iubiubn@ijzbefiun.com"), new Orga(2, "Pierre", "Ducul", "wallah@jtbz.com")];
	this.task = new Task(1, "test", "testunpeuplluslongenf", 5);
	this.subshifts = [new Subshift(2, "2019-04-24 13:00", "2019-04-24 13:15"), new Subshift(3, "2019-04-24 13:15", "2019-04-24 13:30")];
	this.startdate = this.subshifts[0].start_date.split(' ')[0];
	this.starthour = this.subshifts[0].start_date.split(' ')[1];
	this.enddate = this.subshifts[0].end_date.split(' ')[0];
	this.endhour = this.subshifts[0].end_date.split(' ')[1];
  }

  getTaskById(id: number) {
	this.taskService.getTask(id)
	.subscribe(task => this.task = task);
  }

  getOrgas(id: number) {
	  this.taskService.getAllTaskOrgas(id)
	  .subscribe(orgas => this.orgas = orgas);
  }

  getSubshifts(id: number) {
	  this.taskService.getTaskShift(id)
	  .subscribe(subshifts => this.subshifts = subshifts);
  }

  deleteOrga(id: number) {
	
  }


}
