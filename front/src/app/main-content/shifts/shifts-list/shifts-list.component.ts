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
		this.getShifts();
	}

  getShifts() {
	  this.shiftService.getAllShifts()
	  .subscribe(res => {
		  if (res.status == 0) {
			this.shifts = res.shift;
		  }
	  });
  }

}
