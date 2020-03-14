import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';
import { Usager } from '../usager';
import { UsagerService } from '../usager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private token: String;
  private usagerConnecte: Usager;

  constructor(
    private authorizationService: AuthorizationService,
    private usagerService: UsagerService,
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

  getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte(this.token).subscribe((usager) => {
      this.usagerConnecte = usager;
      console.log(this.usagerConnecte);});
  }

  logout(): void {
    this.authorizationService.resetToken();
    this.router.navigate(['/login']);
  }
}
