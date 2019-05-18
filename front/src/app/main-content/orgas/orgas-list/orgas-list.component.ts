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
		this.orgas = [new Orga(1, "Jean", "Papon", "iubiubn@ijzbefiun.com"), new Orga(2, "Pierre", "Ducul", "wallah@jtbz.com")];
  }

  getOrgas(): void {
	  this.orgaService.getAllOrgas()
	  	.subscribe(orgas => this.orgas = orgas);
  }

}
