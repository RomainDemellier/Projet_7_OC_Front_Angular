import { Component, OnInit } from '@angular/core';
import { UsagerService } from '../service/usager.service';
import { Usager } from '../interface/usager';

@Component({
  selector: 'app-liste-usagers',
  templateUrl: './liste-usagers.component.html',
  styleUrls: ['./liste-usagers.component.css']
})
export class ListeUsagersComponent implements OnInit {

  listeUsagers: Usager[];
  usagerConnecte: Usager;

  constructor(
    private usagerService: UsagerService
  ) { }

  ngOnInit(): void {
    this.getUsagerConnecte();
    this.getAllUsagers();
  }

  getUsagerConnecte(): void {
    this.usagerService.getUsagerConnecte().subscribe((usager) => {
      this.usagerConnecte = usager;
    });
  }

  getAllUsagers(){
    this.usagerService.getAllUsagers().subscribe((usagers) => {
      this.listeUsagers = usagers;
    })
  }

}
