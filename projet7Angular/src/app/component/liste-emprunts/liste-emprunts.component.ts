import { Component, OnInit, ViewChild } from '@angular/core';
import { Emprunt } from 'src/app/interface/emprunt';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EmpruntService } from 'src/app/service/emprunt.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { UsagerService } from 'src/app/service/usager.service';
import { Usager } from 'src/app/interface/usager';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-liste-emprunts',
  templateUrl: './liste-emprunts.component.html',
  styleUrls: ['./liste-emprunts.component.css']
})
export class ListeEmpruntsComponent implements OnInit {

  public usagerConnecte: Usager;
  public emprunts: Emprunt[];
  public dataSource: MatTableDataSource<Emprunt>;
  public displayedColumns: string[] = ['emprunteur', 'titre', 'dateEmprunt', 'dateRetour', 'actif'];
  @ViewChild(MatSort) public sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) public paginator: MatPaginator;

  constructor(
    private usagerService: UsagerService,
    private empruntService: EmpruntService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsagerConnecte();
    this.getAllEmprunts();
  }

  private getUsagerConnecte(): void{
    console.log("Dans usagerConnecte")
    this.usagerService.getUsagerConnecte().subscribe((usager) => {

      this.usagerConnecte = usager;
      if(this.usagerConnecte.role != 'ADMIN'){
        this.router.navigate(['/login']);
      }
    }, (error: HttpErrorResponse) => {
      console.log("Echec");
      this.router.navigate(['/login']);
    });
  }

  private getAllEmprunts(): void{
    this.empruntService.getAllEmprunts().subscribe((emprunts) => {
      this.emprunts = emprunts;
      this.dataSource = new MatTableDataSource(emprunts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = function(data, filter: string): boolean {
        return (data.usager.prenom + ' ' + data.usager.nom).toLowerCase().includes(filter)
         || data.livre.titre.toLowerCase().includes(filter) || formatDate(data.dateEmprunt, "dd/MM/yyyy", 'en_US').toLowerCase().includes(filter)
         || formatDate(data.dateRetour, "dd/MM/yyyy", 'en_US').toLowerCase().includes(filter);
    };
  });
  }

  public applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
