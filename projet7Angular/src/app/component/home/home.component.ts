import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../service/authorization.service';
import { Router } from '@angular/router';
import { UsagerService } from '../../service/usager.service';
import { LogoutService } from 'src/app/service/logout.service';
import { Usager } from 'src/app/interface/usager';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  private token: string;
  usagerConnecte: Usager;

  constructor(
    private authorizationService: AuthorizationService,
    private usagerService: UsagerService,
    private logoutService: LogoutService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
     this.token = this.authorizationService.getToken();
    if(this.token == ''){
      this.router.navigate(['/login']);
    } else {
      this.getUsagerConnecte();
    }
  }

  // getUsagerConnecte(): void {
  //   this.usagerService.getUsagerConnecte(this.token).subscribe((usager) => {
  //     this.usagerConnecte = usager;
  //     console.log(this.usagerConnecte);});
  // }

    getUsagerConnecte(): void {
      this.usagerService.getUsagerConnecte().subscribe((usager) => {
        this.usagerConnecte = usager;
        console.log("dans Home");
        console.log(this.usagerConnecte);
    });
  }

  logout(){
    this.authorizationService.resetToken();
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
