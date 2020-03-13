import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usager } from 'src/app/usager';
import { UsagerService } from 'src/app/usager.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private usager: Usager = new Usager() ;

  constructor(
    private usagerService: UsagerService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(confirmPassword){
    // console.log(f.value.firstName);
    // this.usager.prenom = f.value.firstName;
    // this.usager.nom = f.value.lastName;
    // this.usager.email = f.value.email;
    // this.usager.password = f.value.password;

    console.log(this.usager);
    console.log(confirmPassword);

    // this.usagerService.createUsager(this.usager).subscribe(() => {
    //   console.log("Succès");
    //   this.router.navigate([('/login')]);

    // }, (err: HttpErrorResponse) => {
    //   console.log("Echec");
    // })
  }
}
