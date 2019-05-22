import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { ActivatedRoute } from '@angular/router';
import { Shift } from 'src/models/shift';

@Component({
  selector: 'app-shifts-list',
  templateUrl: './shifts-list.component.html',
  providers: [ShiftService],
  styleUrls: ['./shifts-list.component.css']
})


export class ShiftsListComponent implements OnInit {
	
	update: boolean;
	shifts: Shift[];	

  constructor(private shiftService: ShiftService, private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap.subscribe(
		params => {
		  // (+) before `params.get()` turns the string into a number
		  const selectedId = +params.get('id');
		  if(!selectedId) {this.update = true;} else {this.update=false;}
		}
	);
	//this.getShifts();
	this.shifts = [new Shift(1, 1, "2019-05-21 16:00:00", "2019-05-21 17:00:00"), new Shift(1, 2, "2019-05-22 09:00:00", "2019-05-22 12:00:00")]
  }

  getShifts() {
	  this.shiftService.getAllShifts()
	  .subscribe(res => {
		  if (res.status == 200) {
			this.shifts = res;
		  }
	  });
  }

}
