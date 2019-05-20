import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Task } from 'src/models/task';
import { Orga } from 'src/models/orga';
import { Subshift } from 'src/models/subshift';
import { OrgaService } from '../../orgas/orga.service';

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
	startdate: string;
	enddate: string;
	starthour: string;
	endhour: string;
	optionHidden: boolean = true;

  constructor(private taskService: TaskService, private orgaService: OrgaService, private route: ActivatedRoute, private router: Router) { }

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
				//this.getTaskById(selectedId);
		  		//this.getOrgas(selectedId);
		  		//this.getSubshifts(selectedId);
			}
		}
	);
	if(!this.create) {
		this.orgas = [new Orga(1, "Jean", "Papon", "iubiubn@ijzbefiun.com"), new Orga(2, "Pierre", "Ducul", "wallah@jtbz.com")];
		this.task = new Task(1, "test", "testunpeuplluslongenf", 1);
		this.subshifts = [new Subshift(2, "2019-04-24 13:00", "2019-04-24 13:15"), new Subshift(3, "2019-04-24 13:15", "2019-04-24 13:30")];
		this.startdate = this.subshifts[0].start_date.split(' ')[0];
		this.starthour = this.subshifts[0].start_date.split(' ')[1];
		this.enddate = this.subshifts[0].end_date.split(' ')[0];
		this.endhour = this.subshifts[0].end_date.split(' ')[1];
		//this.getAllOrgas(); necessary once it works
		this.allOrgas = [new Orga(1, "Jean", "Papon", "iubiubn@ijzbefiun.com"), new Orga(2, "Pierre", "Ducul", "wallah@jtbz.com"), new Orga(3, "Jacquouilles", "Lafripouille", "fripdu69@laposte.net")];
	} else {
		//this.getAllOrgas(); idem
		this.task = new Task(undefined, undefined, undefined, undefined);
		this.orgas = [new Orga(1, "Jean", "Papon", "iubiubn@ijzbefiun.com"), new Orga(2, "Pierre", "Ducul", "wallah@jtbz.com"), new Orga(3, "Jacquouilles", "Lafripouille", "fripdu69@laposte.net")];
	}
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

  getAllOrgas() {
	this.orgaService.getAllOrgas()
	.subscribe(orgas => {
		if(this.create) {
			this.orgas = orgas
		} else {
			this.allOrgas = orgas;
		}
	});
  }

  deleteOrga(id: number) {
	
  }

  addOrga() {
	this.orgaService.assignTaskToOrga(this.addedOrga, this.task.idTask)
	.subscribe();
	this.router.navigateByUrl('/tasks/' + this.task.idTask);
  }

  onSubmit() {
	/**  
	const body = {name: this.task.name, description: this.task.description};
	  const idStart: number;
	  const idEnd: number;
	  this.taskService.createTask(idStart, idEnd, this.task.idOrga, body)
	  .subscribe(res => {
			this.router.navigateByUrl('/tasks/' + res.task.idOrga);
		});
	*/
	this.router.navigateByUrl('/tasks');
  }


}
