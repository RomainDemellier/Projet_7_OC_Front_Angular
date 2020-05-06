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
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
        //return data.titre.toLowerCase().includes(filter) || data.fullNameAuteur.toLowerCase().includes(filter) || data.genre.toLowerCase().includes(filter);
        return data.titre.toLowerCase().includes(filter) || (data.auteur.prenom + ' ' + data.auteur.nom).toLowerCase().includes(filter) || data.genre.toLowerCase().includes(filter);

      };
    });
  }

  private getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
      this.displayedColumns = ['titre', 'fullNameAuteur', 'genre', 'nbreExemplaires'];
      console.log("usagerConnecte");
      console.log(this.usagerConnecte);
      const allReadyLogged: Boolean = this.loginService.isAllReadyLogged();
      if(!allReadyLogged){
        this.messageService.add({severity:'success', summary:'Bienvenue ' + this.usagerConnecte.prenom, detail:''}); 
        this.loginService.logged();
      }
    });
  }

  public applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
