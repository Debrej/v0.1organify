import { Component, OnInit } from '@angular/core';
import { OrgaService } from '../orga.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orga } from 'src/models/orga';
import { Shift } from 'src/models/shift';

@Component({
  selector: 'app-orga-detail',
  templateUrl: './orga-detail.component.html',
  providers: [OrgaService],
  styleUrls: ['./orga-detail.component.css']
})
export class OrgaDetailComponent implements OnInit {

	orga: Orga;
	password: string;
	update: boolean;
	create: boolean;
	shifts: Shift[];
	addedShift: Shift[];
	allShifts: Shift[];
	optionHidden: boolean = true;

  constructor(private orgaService: OrgaService, private route: ActivatedRoute, private router: Router) { }

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
				this.getOrgaById(selectedId);
				this.getShifts(selectedId);
			}
		}
	);
	if(!this.create) {
	} else {
		this.orga = new Orga(undefined, undefined, undefined, undefined);
	}
}

  getOrgaById(id: number) {
	this.orgaService.getOrga(id)
	.subscribe(res => {
		if (res.status == 0) {
			this.orga = res.orga;
		}
	});
  }

  getShifts(id: number) {
	this.orgaService.getOrgaShift(id)
	.subscribe(res => {
		if (res.status == 0) {
			this.shifts = res.shift;
		}
	});
  }

  deleteOrga() {
	  let taskSupp = 0;
	  if(confirm('Supprimer ses tâches au passage ?')) {
		taskSupp = 1;
	  }
	  this.orgaService.deleteOrga(this.orga.idOrga, false)
	  .subscribe(res => {
		if (res.status == 0) {
			this.router.navigateByUrl('/orgas');
		}
	  });
  }

  addShift() {
	  let body = {shifts: this.addedShift};
	  this.orgaService.postShifts(this.orga.idOrga, body)
	  .subscribe(res => {
		  if(res.status == 0) {
			this.router.navigateByUrl('/orgas/' + res.idOrga);
		  }
	  })
  }

  onSubmit() {
	  const body = {
		  first_name: this.orga.first_name,
		  lasy_name: this.orga.last_name,
		  mail: this.orga.mail,
		  pwd: this.password
	  };
	  this.orgaService.createOrga(body)
	  .subscribe(res => {
		  if(res.status == 0) {
			this.router.navigateByUrl('/orgas/' + res.orga.idOrga);
		  }
	  });
  }

}
