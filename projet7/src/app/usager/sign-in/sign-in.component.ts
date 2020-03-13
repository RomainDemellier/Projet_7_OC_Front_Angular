import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from 'src/app/login';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private login: Login;

  constructor(
    private loginService: LoginService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(username, password){
    // var dataLoginJson = {
    //   'username': username,
    //   'password': password
    // }
    console.log(username);
    this.login = { username: username, password: password }

    this.loginService.authenticate(this.login).subscribe((data:any) => {
      console.log("Succès ");
      this.authorizationService.initializeToken(data);
      this.router.navigate(['/home']);
    },
    (err: HttpErrorResponse) => { console.log("Erreur") });
  }
}
