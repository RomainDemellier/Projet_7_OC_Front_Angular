import { Component, OnInit } from '@angular/core';
import { LivreService } from 'src/app/livre.service';
import { Livre } from 'src/app/livre';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization.service';
import { Usager } from 'src/app/usager';
import { UsagerService } from 'src/app/usager.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {

  livres: Livre[];
  token: String;
  usagerConnecte: Usager;

  constructor(
    private livreService: LivreService,
    private usagerService: UsagerService,
    private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.token = this.authorizationService.getToken();
    this.getLivres();
    this.getUsagerConnecte();
  }

  getLivres(): void {
    this.livreService.getLivresDisponibles(this.token).subscribe(livres => this.livres = livres);
  }

  getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte(this.token).subscribe((usager) => {
      this.usagerConnecte = usager;
      console.log(this.usagerConnecte);});
  }
}
