import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material';
import { OrgaService } from '../main-content/orgas/orga.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  providers: [
	  AuthService,
	  OrgaService
  ],
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  mail: any;
  pwd: any;

  durationSnackBar = 50;

  constructor(private _authService: AuthService, private _router: Router, private _cookieService: CookieService, private _snackBar: MatSnackBar, private zone: NgZone, private orgaService: OrgaService) {
  }

  login(mail, pwd): void{
    this._authService.getToken(mail, pwd).subscribe(ret => {
      let data = JSON.parse(JSON.stringify(ret));
      if(data.status === 0){ // if the status is ok
        if(data.response === true){ // if the password is the right one
		  this._cookieService.set("token", data.token, undefined, '/', 'localhost:8000'); // we store the token in the cookie
		  this.setConnectedUser(data.idOrga);
		  this._authService.setToken(data.token);
          this._router.navigate(['/', 'dashboard']); // we navigate to the other view
        }
        else{
          this.openSnackBar("Not the good password sorry", this.zone);
        }
      }
      else if (data.status === 2){
        this.openSnackBar("The user does not exist", this.zone);
      }
      else{
        this.openSnackBar("Error within the server", this.zone);
      }
    });
  }

  openSnackBar(msg: string, zone: any) {
    zone.run(() => {
      this._snackBar.open(msg, 'ok', {
        duration: this.durationSnackBar * 1000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snack-error'
      });
    });
  }
  
  setConnectedUser(id: number) {
	this.orgaService.getOrga(id)
	.subscribe(orga => this._authService.setConnectedUser(orga));
  }

  ngOnInit() {
  }

}
