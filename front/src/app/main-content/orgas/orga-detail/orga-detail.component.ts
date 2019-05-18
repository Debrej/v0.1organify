import { Component, OnInit } from '@angular/core';
import { OrgaService } from '../orga.service';
import { ActivatedRoute } from '@angular/router';
import { Orga } from 'src/models/orga';

@Component({
  selector: 'app-orga-detail',
  templateUrl: './orga-detail.component.html',
  providers: [OrgaService],
  styleUrls: ['./orga-detail.component.css']
})
export class OrgaDetailComponent implements OnInit {

	orga: Orga;
	create: boolean;

  constructor(private orgaService: OrgaService, private route: ActivatedRoute) { }

  ngOnInit() {
	this.route.paramMap.subscribe(
		params => {
		  // (+) before `params.get()` turns the string into a number
		  const selectedId = +params.get('id');
		  if(!selectedId) {this.create = true;} else {this.create=false;}
		  this.getOrgaById(selectedId);
		}
	);
	this.orga = new Orga(1, "Jean", "Papon", "iubiubn@ijzbefiun.com");
  }

  getOrgaById(id: number) {
	this.orgaService.getOrga(id)
	.subscribe(orga => this.orga = orga);
  }

}
