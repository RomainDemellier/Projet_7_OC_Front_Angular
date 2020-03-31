import { Component, OnInit, AfterViewInit, Input, Directive } from '@angular/core';
import { LivreService } from 'src/app/service/livre.service';
import { Livre } from 'src/app/interface/livre';
import { Observable, Subject } from 'rxjs';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { UsagerService } from 'src/app/service/usager.service';
import { Emprunt } from 'src/app/interface/emprunt';
import { Usager } from 'src/app/interface/usager';
import { EmpruntService } from 'src/app/service/emprunt.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { LoginService } from 'src/app/service/login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmprunterModalComponent } from '../modal/emprunter-modal/emprunter-modal.component';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';

@Component({
  selector: 'app-livre',
  templateUrl: './liste-livres.component.html',
  styleUrls: ['./liste-livres.component.css'],
  providers: [MessageService],
})
export class ListeLivresComponent implements OnInit, AfterViewInit {

  livres: Livre[];
  //token: string;
  usagerConnecte: Usager;

  constructor(
    private livreService: LivreService,
    private usagerService: UsagerService,
    private empruntService: EmpruntService,
    private authorizationService: AuthorizationService,
    private loginService: LoginService,
    private messageService: MessageService,
    private dialogService: DialogEmpruntModalService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    
    //this.token = this.authorizationService.getToken();
    this.getLivres();
    this.getUsagerConnecte();
  }

  ngAfterViewInit(){
    // this.messageService.add({severity:'success', summary:'Bienvenue', detail:''}); 
  }

  getLivres(): void {
    this.livreService.getLivresDisponibles().subscribe(livres => this.livres = livres);
  }

  getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
      console.log("usagerConnecte");
      console.log(this.usagerConnecte);
      const allReadyLogged: Boolean = this.loginService.isAllReadyLogged();
      if(!allReadyLogged){
        this.messageService.add({severity:'success', summary:'Bienvenue ' + this.usagerConnecte.prenom, detail:''}); 
        this.loginService.logged();
      }
    });
  }

  emprunter(livre: Livre){
    console.log("Dans emprunter");
    var emprunt: Emprunt = {id:null,livre:null,usager:null,dateEmprunt:null,dateRetour:null,prolonge:null,actif:null};
    emprunt.livre = livre;
    emprunt.usager = this.usagerConnecte;
    this.dialogService.openDialog(this.usagerConnecte.prenom, livre.titre)
    .afterClosed().subscribe((result) => {
      console.log(result);
      if(result){
        this.empruntService.createEmprunt(emprunt).subscribe((emprunt) =>{
          console.log("Succès");
          console.log(emprunt);
          if(emprunt != null){
            this.messageService.add({severity:'success', summary:'Succès', detail:'Bravo vous avez emprunté un livre !'});
          } else {
            this.messageService.add({severity:'info', life:5000, summary:'Info', detail:'Désolé, vous êtes déjà en possession de ce livre ou ce livre est indisponible.'});
          }
        }, (error: HttpErrorResponse) => {
          console.log("Echec");
        }
        );
      } else {
        console.log("result : false");
      }
    });
  }
}
