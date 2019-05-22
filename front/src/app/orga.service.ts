import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrgaService {
  private token: any;
  private httpOptions: any;

  passToken(token){
    this.token = token;
    let tokenStr = 'Bearer ' + this.token;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': tokenStr
      })
  }
  }

  getOrga(idOrga){
    return this.http.get("https://api.organify.debrej.fr/orga/" + idOrga, this.httpOptions);
    //return this.http.get("http://localhost:8000/orga/" + idOrga, this.httpOptions);
  }

  constructor(private http: HttpClient) {  }
}
