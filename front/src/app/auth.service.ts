import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

	baseUrl = 'http://localhost:8000';

  getToken(mail, pwd){
    return this.http.post( this.baseUrl + '/login', {"mail": mail, "pwd": pwd});
  }

  delToken(body: any) {
	  return this.http.post(this.baseUrl + '/logout', body);
  }

  constructor(private http: HttpClient) { }
}
