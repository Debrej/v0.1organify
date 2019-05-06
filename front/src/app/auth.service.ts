import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(mail, pwd){
    return this.http.post("https://api.organify.debrej.fr/login/", {"mail": mail, "pwd": pwd});
  }

  constructor(private http: HttpClient) { }
}
