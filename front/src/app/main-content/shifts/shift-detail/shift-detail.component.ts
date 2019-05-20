import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { Shift } from 'src/models/shift';
import { Subshift } from 'src/models/subshift';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private shiftService: ShiftService, private route: ActivatedRoute, private router: Router) { }

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
			}
		}
	);
  }

}
