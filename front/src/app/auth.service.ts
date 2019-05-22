import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Orga } from 'src/models/orga';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	baseUrl = 'http://localhost:8000';
	connectedUser: Orga;
	token: String = '929dd47dea2b93d56c2c6a16eac072317b216dfbd743d61da6e447609b171b30284c1107b477f5dbe69f3743a0f9e2bf';

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
