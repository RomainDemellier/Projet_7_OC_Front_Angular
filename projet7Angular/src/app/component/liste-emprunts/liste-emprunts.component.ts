import { Component, OnInit, ViewChild } from '@angular/core';
import { Emprunt } from 'src/app/interface/emprunt';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EmpruntService } from 'src/app/service/emprunt.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-liste-emprunts',
  templateUrl: './liste-emprunts.component.html',
  styleUrls: ['./liste-emprunts.component.css']
})
export class ListeEmpruntsComponent implements OnInit {

  emprunts: Emprunt[];
  dataSource: MatTableDataSource<Emprunt>;
  displayedColumns: string[] = ['emprunteur', 'titre', 'dateEmprunt', 'dateRetour', 'actif'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private empruntService: EmpruntService
  ) { }

  ngOnInit(): void {
    this.getAllEmprunts();
  }

  getAllEmprunts(){
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

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
