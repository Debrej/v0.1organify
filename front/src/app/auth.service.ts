import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(mail, pwd){
    return this.http.post("145.239.77.236:8000/login/", {"mail": mail, "pwd": pwd});
  }

  constructor(private http: HttpClient) { }
}
