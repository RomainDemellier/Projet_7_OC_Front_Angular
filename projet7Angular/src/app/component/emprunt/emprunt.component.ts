import { Component, OnInit } from '@angular/core';
import { Emprunt } from 'src/app/interface/emprunt';
import { Usager } from 'src/app/interface/usager';
import { UsagerService } from 'src/app/service/usager.service';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { EmpruntService } from 'src/app/service/emprunt.service';
import { MessageService } from 'primeng/api';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-emprunt',
  templateUrl: './emprunt.component.html',
  styleUrls: ['./emprunt.component.css'],
  providers: [MessageService]
})
export class EmpruntComponent implements OnInit {

  emprunts: Emprunt[];
  token: string;
  usagerConnecte: Usager;

  constructor(
    private empruntService: EmpruntService,
    private usagerService: UsagerService,
    private authorizationService: AuthorizationService,
    private messageService: MessageService,
    private dialogService: DialogEmpruntModalService
  ) { }

  ngOnInit() {
    this.token = this.authorizationService.getToken();
    this.getUsagerConnecte();
    this.getEmpruntsUsagerConnecte();
  }

  getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
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

  openDialog(emprunt: Emprunt){
    this.dialogService.openDialogEmpruntDetail(emprunt)
    .afterClosed().subscribe((res) =>  {
      console.log(res);
      //this.messageService.add({severity: 'warn', summary: 'Pas de prolongement', detail: 'Votre Emprunt du livre ' + emprunt.livre.titre + ' a déjà été prolongé de 4 semaines.'});
      if(res === "prolongationOk"){
        this.getEmpruntsUsagerConnecte();
        this.messageService.add({severity: 'info', summary: 'Prolongement', detail: 'Votre Emprunt du livre ' + emprunt.livre.titre.toUpperCase() + ' est prolongé de 4 semaines.'});
      } else if(res === "prolongationPasOk"){
        this.messageService.add({severity: 'warn', summary: 'Pas de prolongement', detail: 'Votre Emprunt du livre ' + emprunt.livre.titre.toUpperCase() + ' a déjà été prolongé de 4 semaines.'});
      } else if(res === "rendreOk"){
        this.getEmpruntsUsagerConnecte();
        this.messageService.add({severity: 'info', summary: 'Retour', detail: 'Le livre ' + emprunt.livre.titre + ' a été rendu.'});
      } else if(res === "rendrePasOk"){
        this.messageService.add({severity: 'warn', summary: 'Problème retour', detail: 'Le livre ' + emprunt.livre.titre.toUpperCase() + ' n\'a pu être rendu.'});
      }
    })
  }
}
