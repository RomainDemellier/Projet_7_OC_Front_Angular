import { Component, OnInit, ViewChild } from '@angular/core';
// import { UsagerService } from '../../service/usager.service';
import { Usager } from '../../interface/usager';
import { MessageService } from 'primeng/api';
import { UsagerService } from 'src/app/service/usager.service';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-usagers',
  templateUrl: './liste-usagers.component.html',
  styleUrls: ['./liste-usagers.component.scss'],
  providers: [MessageService]
})
export class ListeUsagersComponent implements OnInit {

  public listeUsagers: Usager[];
  public usagerConnecte: Usager;
  public dataSource: MatTableDataSource<Usager>;
  public displayedColumns: string[] = ['nom', 'email', 'role', 'actions'];
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;

  constructor(
    private usagerService: UsagerService,
    private messageService: MessageService,
    private router: Router,
    private dialogService: DialogEmpruntModalService
  ) { }

  ngOnInit(): void {
    this.getUsagerConnecte();
    this.getAllUsagers();
  }

  private getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
      if(this.usagerConnecte.role != 'ADMIN'){
        this.router.navigate(['/login']);
      }
    }, (error: HttpErrorResponse) => {
      this.router.navigate(['/login']);
    });
  }

  private getAllUsagers(): void{
    this.usagerService.getAllUsagers().subscribe((usagers) => {
      this.listeUsagers = usagers;
      this.dataSource = new MatTableDataSource(usagers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return (data.prenom + ' ' + data.nom).toLowerCase().includes(filter)
         || data.email.toString().includes(filter) || data.role.toLowerCase().includes(filter);
    };
    })
  }

  public openDialog(usager: Usager): void{
    this.dialogService.openDialogEditerRole(usager)
    .afterClosed().subscribe((res) => {
      if(res){
        this.getAllUsagers();
      }
    });
  }

  public openDialogCreateAdmin(): void{
    this.dialogService.openDialogCreateAdmin().afterClosed()
    .subscribe((res) => {
      if(res != "exit"){
        if(res){
          this.getAllUsagers();
          this.messageService.add({ severity: 'success', summary: 'Création d\'un administrateur', detail: 'La création de l\'administrateur a été effectuée avec succès.' })
        } else {
          this.messageService.add({ severity: 'error', summary: 'Echec de la création d\'un administrateur', detail: 'Désolé, ça n\'a pas fonctionné.' })
        }
      }
    })
  }

  public applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
