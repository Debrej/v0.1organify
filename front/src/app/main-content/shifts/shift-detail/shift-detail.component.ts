import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { Shift } from 'src/models/shift';
import { Subshift } from 'src/models/subshift';
import { ActivatedRoute, Router } from '@angular/router';
import { Orga } from 'src/models/orga';
import { Task } from 'src/models/task';

@Component({
  selector: 'app-shift-detail',
  templateUrl: './shift-detail.component.html',
  providers: [ShiftService],
  styleUrls: ['./shift-detail.component.css']
})
export class ShiftDetailComponent implements OnInit {

	
	update: boolean;
	create: boolean;
	shift: Shift;
	subshifts: Subshift[];
	selectedId: number;
	startdate: string;
	enddate: string;
	starthour: string;
	endhour: string;
	orgas: Orga[];
	tasks: Task[];

  constructor(private shiftService: ShiftService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
	this.route.paramMap.subscribe(
		params => {
		  // (+) before `params.get()` turns the string into a number
		  this.selectedId = +params.get('id');
		  const action = params.get('action');
		  if(!this.selectedId) {
			  this.create = true;
			  this.update = true;
			} else {
				this.create = false;
				if(!action) {
					this.update = false;
				} else {
					this.update = true;
				}
				this.getSubshifts(this.selectedId);
				this.getOrgas(this.selectedId);
				this.getTasks(this.selectedId);
			}
		}
	);
	if(!this.create) {
		
	} else {

	}
  }

  getSubshifts(id: number) {
	this.shiftService.getShiftSubshifts(id)
	.subscribe(res => {
		if (res.status == 0) {
			this.subshifts = res.subshift;
			this.startdate = this.subshifts[0].start_date.split(' ')[0];
			this.starthour = this.subshifts[0].start_date.split(' ')[1];
			this.enddate = this.subshifts[this.subshifts.length - 1].end_date.split(' ')[0];
			this.endhour = this.subshifts[this.subshifts.length - 1].end_date.split(' ')[1];
		}
	});
  }

  getOrgas(id: number) {
	  this.shiftService.getAllShiftOrgas(id)
	  .subscribe(res => {
		  if (res.status == 0) {
			this.orgas = res.orga;
		  }
	  });
  }

  getTasks(id: number) {
	  this.shiftService.getAllShiftTasks(id)
	  .subscribe(res => {
		  if (res.status == 0) {
			this.tasks = res.task;
		  }
	  });
  }

  onSubmit() {
	const start = this.startdate + ' ' + this.starthour;
	const end = this.enddate + ' ' + this. endhour;
	this.shiftService.createMultipleShifts(start, end)
	  .subscribe(res => {
		  if (res.status == 0) {
			this.router.navigateByUrl('/shifts/' + res.shift.idShift);
		  }
		});
  }
}
