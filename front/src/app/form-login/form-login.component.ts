import {Component, OnInit, NgZone, ElementRef, ViewChild, HostListener} from '@angular/core';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { CookieService } from "angular2-cookie/core";
import { MatSnackBar } from '@angular/material';
import {ENTER} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  @ViewChild('checkboxRememberMe') checkboxRememberMe: ElementRef;
  @ViewChild('mailInput') mailInput: ElementRef;
  @ViewChild('pwdInput') pwdInput: ElementRef;

  durationSnackBar = 50;
  private mail: any;
  private pwd: any;

  constructor(private _authService: AuthService, private _router: Router, private _cookieService: CookieService, private _snackBar: MatSnackBar, private zone: NgZone) {
  }

  signIn(): void{
    this._router.navigate(['/', 'signIn']);
  }

  login(): void{
    this.mail = this.mailInput.nativeElement.value;
    this.pwd = this.pwdInput.nativeElement.value;
    this._authService.getToken(this.mail, this.pwd).subscribe(ret => {
      let data = JSON.parse(JSON.stringify(ret));
      if(data.status === 0){ // if the status is ok
        if(data.response === true){ // if the password is the right one
          this._cookieService.put("token", data.token, {path: "/"}); // we store the token in the cookie
          this._router.navigate(['/', 'test']); // we navigate to the other view
        }
        else{
          this.openSnackBar("Not the good password.", this.zone);
        }
      }
      else if (data.status === 2){
        this.openSnackBar("The user does not exist.", this.zone);
      }
      else{
        this.openSnackBar("Server error", this.zone);
      }
    });
  }

  openSnackBar(msg: string, zone: any) {
    zone.run(() => {
      this._snackBar.open(msg, null, {
        duration: this.durationSnackBar * 50,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'snack-error'
      });
    });
  }

  changeStateInput(){
    this.checkboxRememberMe.nativeElement.checked = !this.checkboxRememberMe.nativeElement.checked;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key);
    // @ts-ignore
    if(event.key == "Enter"){
      this.login()
    }
  }

  ngOnInit() {
  }

}
