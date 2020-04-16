import { Component, OnInit, AfterViewInit, Input, Directive, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//import { DataSource } from '@angular/material/table';


@Component({
  selector: 'app-livre',
  templateUrl: './liste-livres.component.html',
  styleUrls: ['./liste-livres.component.scss'],
  providers: [MessageService],
})
export class ListeLivresComponent implements OnInit {

  public livres: Livre[];
  public dataSource: MatTableDataSource<Livre>;
  public displayedColumns: string[] = ['titre', 'fullNameAuteur', 'genre', 'nbreExemplaires'];
  public usagerConnecte: Usager;
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;

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

  ngOnInit(): void {
    this.getLivres();
    this.getUsagerConnecte();
  }

  private getLivres(): void {
    this.livreService.getLivresDisponibles().subscribe(livres => { 
      this.livres = livres;
      console.log(this.livres);
      this.dataSource = new MatTableDataSource(this.livres);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return data.titre.toLowerCase().includes(filter) || data.fullNameAuteur.toLowerCase().includes(filter) || data.genre.toLowerCase().includes(filter);
      };
    });
  }

  private getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
      this.displayedColumns = ['titre', 'fullNameAuteur', 'genre', 'nbreExemplaires', 'actions'];
      console.log("usagerConnecte");
      console.log(this.usagerConnecte);
      const allReadyLogged: Boolean = this.loginService.isAllReadyLogged();
      if(!allReadyLogged){
        this.messageService.add({severity:'success', summary:'Bienvenue ' + this.usagerConnecte.prenom, detail:''}); 
        this.loginService.logged();
      }
    });
  }

  public emprunter(livre: Livre): void{
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
            this.messageService.add({severity:'success', summary:'Succès', detail:'Bravo vous avez emprunté un livre !'});
          
        }, (error: HttpErrorResponse) => {
          console.log("Echec");
          console.log(error.status);
          this.messageService.add({severity:'warn', life:5000, summary:'Info', detail:'Désolé, vous êtes déjà en possession de ce livre ou ce livre est indisponible.'});
        }
        );
      } else {
        console.log("result : false");
      }
    });
  }

  public applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public openDialog(): void{
    this.dialogService.openDialogCreationLivre().afterClosed().subscribe((res) => {
      if(res != "exit"){
        if(res) {
          this.getLivres();
          this.messageService.add({ severity: "success", summary: "Création Ok", detail: "La création du livre a été faite avec succès" });
        } else {
          this.messageService.add({ severity: "error", summary: "Echec de la création du livre", detail: "Désolé, ça n'a pas fonctionné." });
        }
      }
    });
  }

  public editerLivre(livre): void{
    this.dialogService.openDialogEditLivre(livre).afterClosed().subscribe((res) => {
      if(res != "exit"){
        if(res) {
          this.getLivres();
          this.messageService.add({ severity: "success", summary: "Modification Ok", detail: "La modification du livre a été faite avec succès" });
        } else {
          this.messageService.add({ severity: "error", summary: "Echec de la modification du livre", detail: "Désolé, ça n'a pas fonctionné." });
        }
      }
    });
  }
}
