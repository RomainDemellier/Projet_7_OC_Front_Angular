import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private token: String;

  constructor() { }

  initializeToken(data: any){
    this.token = data.token;
    console.log("Dans intializeToken token : " + this.token);
  }

  getToken(): String {
    return this.token;
  }
}
