import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/core";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private routerService: Router, private authService: AuthService, private cookieService: CookieService) { }

  logout() {
	// let data = this.cookieService.get("token");
	let body = {token: "67a3d39617aabcd465ec9c25da3221f0095c57a98f6fbdc367af182ea15d0f36484aa96a3fd5ababb77cc50614b46d06"};
	this.authService.delToken(body).subscribe(res => null);

  }

  ngOnInit() {
  }

}
