import { Component, OnInit } from '@angular/core';
import { OrgaService } from '../orga.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Orga } from 'src/models/orga';

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
			}
		}
	);
	if(!this.create) {
		this.orga = new Orga(1, "Jean", "Papon", "iubiubn@ijzbefiun.com"); 
	} else {
		this.orga = new Orga(undefined, undefined, undefined, undefined);
	}
}

  getOrgaById(id: number) {
	this.orgaService.getOrga(id)
	.subscribe(orga => this.orga = orga);
  }

  onSubmit() {
	  const body = {
		  first_name: this.orga.first_name,
		  lasy_name: this.orga.last_name,
		  mail: this.orga.mail,
		  pwd: this.password
	  };
	  this.orgaService.createOrga(body)
	  .subscribe(orga => {
			this.orga = <Orga>orga;
			this.router.navigateByUrl('/orgas/' + this.orga.idOrga);
	  });
  }

}
