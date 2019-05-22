import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Orga } from 'src/models/orga';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	baseUrl = 'https://api.organify.debrej.fr';
	connectedUser: Orga;
	token: string = 'eaebf277e0037bc319193fe4887bc5ba6b6fabeec06e6356a93744c1e2ad0b24826c20f16983327c2c253a44f4cf8dcf';

  getToken(mail, pwd){
    return this.http.post( this.baseUrl + '/login', {"mail": mail, "pwd": pwd});
  }

  delToken(body: any) {
		this.token = '';
	  	return this.http.post(this.baseUrl + '/logout', body);
  }

  setConnectedUser(orga: Orga) {
	this.connectedUser = orga;
  }

  setToken(token: string) {
	  this.token = token;
  }

  constructor(private http: HttpClient) { }
}
