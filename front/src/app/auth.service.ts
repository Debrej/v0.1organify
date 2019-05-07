import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(mail, pwd){
    return this.http.post("https://api.organify.debrej.fr/login", {"mail": mail, "pwd": pwd});
    //return this.http.post("http://localhost:8000/login", {"mail": mail, "pwd": pwd});
  }

  createOrga(first_name, last_name, mail, pwd){
    return this.http.post("https://api.organify.debrej.fr/orga", {"first_name": first_name, "last_name": last_name, "mail": mail, "pwd": pwd});
    //return this.http.post("http://localhost:8000/orga", {"first_name": first_name, "last_name": last_name, "mail": mail, "pwd": pwd});
  }

  constructor(private http: HttpClient) { }
}
