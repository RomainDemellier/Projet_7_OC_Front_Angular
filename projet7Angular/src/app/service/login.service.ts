import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../interface/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/authenticate';
  private allReadyLogged: Boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  authenticate(login: Login){
    console.log(login.username);
    return this.http.post<Login>(this.loginUrl, login);
  }

  logged(){
    this.allReadyLogged = true;
  }

  logout(){
    this.allReadyLogged = false;
  }

  isAllReadyLogged(): Boolean {
    return this.allReadyLogged;
  }
}
