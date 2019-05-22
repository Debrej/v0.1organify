import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth.service";
import { Orga } from 'src/models/orga';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

	user: Orga;

  constructor(private authService: AuthService) { }

  ngOnInit() {
	  //this.user = this.authService.connectedUser;
	  this.user = new Orga(23, 'Devulder', 'Vincent', "vincent.devulder@insa-lyon.fr");
  }

}
