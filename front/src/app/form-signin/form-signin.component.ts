import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-form-signin',
  templateUrl: './form-signin.component.html',
  styleUrls: ['./form-signin.component.css']
})
export class FormSigninComponent implements OnInit {

  @ViewChild('firstNameInput') firstNameInput: ElementRef;
  @ViewChild('lastNameInput') lastNameInput: ElementRef;
  @ViewChild('mailInput') mailInput: ElementRef;
  @ViewChild('pwdInput') pwdInput: ElementRef;
  @ViewChild('pwdConfirmInput') pwdConfirmInput: ElementRef;
  private mail: any;
  private pwd: any;
  private pwdConfirm: any;
  private lastName: any;
  private firstName: any;
  private durationSnackBar: number;

  login():void {
    this._router.navigate(['/', 'login']);
  }

  signIn():void {

    this.lastName = this.lastNameInput.nativeElement.value;
    this.firstName = this.firstNameInput.nativeElement.value;
    this.mail = this.mailInput.nativeElement.value;
    this.pwd = this.pwdInput.nativeElement.value;
    this.pwdConfirm = this.pwdConfirmInput.nativeElement.value;

    if (this.pwd !== this.pwdConfirm){
      this.openSnackBar("The passwords do not match", this.zone);
    }
    else{
      this._authService.createOrga(this.firstName, this.lastName, this.mail, this.pwd).subscribe(ret => {
        let data = JSON.parse(JSON.stringify(ret));
        if(data.status === 0){ // if the status is ok
          this._router.navigate(['/', 'test']); // we navigate to the other view
        }
        else if (data.status === 2){
          this.openSnackBar("Could not create the user", this.zone);
        }
        else{
          this.openSnackBar("Server error", this.zone);
        }
      });
    }
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

  constructor(private _router: Router, private _authService: AuthService, private _snackBar: MatSnackBar, private zone: NgZone) { }

  ngOnInit() {
  }

}
