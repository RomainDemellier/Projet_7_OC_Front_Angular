import { Component, OnInit } from '@angular/core';
import { Emprunt } from 'src/app/interface/emprunt';
import { Usager } from 'src/app/interface/usager';
import { UsagerService } from 'src/app/service/usager.service';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { EmpruntService } from 'src/app/service/emprunt.service';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: ['./emprunt.component.css']
})
export class EmpruntComponent implements OnInit {

  emprunts: Emprunt[];
  token: string;
  usagerConnecte: Usager;

  constructor(
    private empruntService: EmpruntService,
    private usagerService: UsagerService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit() {
    this.token = this.authorizationService.getToken();
    this.getUsagerConnecte();
    this.getEmpruntsUsagerConnecte();
  }

  getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte(this.token).subscribe((usager) => {
      this.usagerConnecte = usager;
      console.log("usagerConnecte");
      console.log(this.usagerConnecte);
    });
  }

  getEmpruntsUsagerConnecte(){
    this.empruntService.getEmpruntsUsagerConnecte(this.token).subscribe((emprunts) => {
      this.emprunts = emprunts;
      console.log("Succès");
    });
  }

}
