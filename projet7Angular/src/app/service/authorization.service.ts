import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private token: string = '';

  constructor() { }

  initializeToken(data: any){
    this.token = data.token;
    console.log("Dans intializeToken token : " + this.token);
  }

  getToken(): string {
    return this.token;
  }

  resetToken(): void {
    this.token = '';
  }
}
