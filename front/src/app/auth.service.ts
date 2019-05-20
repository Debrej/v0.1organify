import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Orga } from 'src/models/orga';
import {OrgaService} from './main-content/orgas/orga.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	baseUrl = 'http://localhost:8000';
	connectedUser: Orga;

  getToken(mail, pwd){
    return this.http.post( this.baseUrl + '/login', {"mail": mail, "pwd": pwd});
  }

  delToken(body: any) {
	  return this.http.post(this.baseUrl + '/logout', body);
  }

  setConnectedUser(id: number) {
	this.orgaService.getOrga(id)
	.subscribe(orga => this.connectedUser = orga);
  }

  constructor(private http: HttpClient, private orgaService: OrgaService) { }
}
