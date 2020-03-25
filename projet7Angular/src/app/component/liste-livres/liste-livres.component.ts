import { Component, OnInit } from '@angular/core';
import { LivreService } from 'src/app/service/livre.service';
import { Livre } from 'src/app/interface/livre';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { UsagerService } from 'src/app/service/usager.service';
import { Emprunt } from 'src/app/interface/emprunt';
import { Usager } from 'src/app/interface/usager';
import { EmpruntService } from 'src/app/service/emprunt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-livre',
  templateUrl: './liste-livres.component.html',
  styleUrls: ['./liste-livres.component.css'],
  providers: [MessageService]
})
export class ListeLivresComponent implements OnInit {

  livres: Livre[];
  token: string;
  usagerConnecte: Usager;

  constructor(
    private livreService: LivreService,
    private usagerService: UsagerService,
    private empruntService: EmpruntService,
    private authorizationService: AuthorizationService,
    private messageService: MessageService
    ) { }

  ngOnInit() {
    
    this.token = this.authorizationService.getToken();
    this.getLivres();
    this.getUsagerConnecte();
  }

  getLivres(): void {
    this.livreService.getLivresDisponibles().subscribe(livres => this.livres = livres);
  }

  getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
      console.log("usagerConnecte");
      console.log(this.usagerConnecte);
    });
  }

  emprunter(livre: Livre){
    console.log("Dans emprunter");
    var emprunt: Emprunt = {id:null,livre:null,usager:null,dateEmprunt:null,dateRetour:null,prolonge:null,actif:null};
    emprunt.livre = livre;
    emprunt.usager = this.usagerConnecte;
    this.empruntService.createEmprunt(emprunt, this.token).subscribe((emprunt) =>{
      console.log("Succès");
      console.log(emprunt);
      if(emprunt != null){
        this.messageService.add({severity:'success', summary:'Succès', detail:'Bravo vous avez emprunté un livre !'});
      } else {
        this.messageService.add({severity:'error', life:5000, summary:'Echec', detail:'Désolé, vous êtes déjà en possession de ce livre ou ce livre est indisponible.'});
      }
    }, (error: HttpErrorResponse) => {
      console.log("Echec");
    }
    );
  }
}
