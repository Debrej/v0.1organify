import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { FormLoginComponent } from './form-login/form-login.component';
import { PhotoLoginComponent } from './photo-login/photo-login.component';
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { LoginViewComponent } from './login-view/login-view.component';
import { TestViewComponent } from './test-view/test-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DefaultViewComponent } from './default-view/default-view.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { MainContentModule } from './main-content/main-content.module';



@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    PhotoLoginComponent,
    LoginViewComponent,
    TestViewComponent,
    SidebarComponent,
    DefaultViewComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
	  BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
	  MatSnackBarModule,
	  MainContentModule,
	  AppRoutingModule
  ],
  providers: [
    AuthService,
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
