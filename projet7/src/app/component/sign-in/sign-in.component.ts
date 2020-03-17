import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login';
import { AuthorizationService } from 'src/app/service/authorization.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  private login: Login;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit() {
  }

  onSubmit(){

    this.loginService.authenticate(this.loginForm.value).subscribe((data:any) => {
      console.log("Succès ");
      this.authorizationService.initializeToken(data);
      this.router.navigate(['/home']);
    },
    (err: HttpErrorResponse) => { console.log("Erreur") });
  }
}
