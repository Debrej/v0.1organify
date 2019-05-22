import { Component, OnInit } from '@angular/core';
import { OrgaService } from '../orga.service';
import { Orga } from 'src/models/orga';

@Component({
  selector: 'app-orgas-list',
  templateUrl: './orgas-list.component.html',
  providers: [OrgaService],
  styleUrls: ['./orgas-list.component.css']
})
export class OrgasListComponent implements OnInit {

	orgas: Orga[];

  constructor(private orgaService: OrgaService) { }

  ngOnInit() {
		this.getOrgas();
  }

  getOrgas(): void {
	  this.orgaService.getAllOrgas()
	  	.subscribe(res =>  {
			if(res.status == 0) {
				this.orgas = res.orga;
			}
		});
  }

}
