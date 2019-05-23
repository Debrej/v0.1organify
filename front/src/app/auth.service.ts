import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Orga } from 'src/models/orga';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	baseUrl = 'https://api.organify.debrej.fr';
	connectedUser: Orga;
	token: string = 'd3fca3427b4261499745c4783272996e47cbf5786e250448fc7c35216c2ef60cb059f96e3272f1680436e84c09416999';

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
