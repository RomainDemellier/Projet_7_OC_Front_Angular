import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/authenticate';

  constructor(
    private http: HttpClient
  ) { }

  authenticate(login: Login){
    console.log(login.username);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //'Authorization': 'Bearer'
      })
    };
    return this.http.post<Login>(this.loginUrl, login, httpOptions);
  }
}
