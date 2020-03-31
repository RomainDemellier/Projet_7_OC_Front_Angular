import { Component, OnInit } from '@angular/core';
// import { UsagerService } from '../../service/usager.service';
import { Usager } from '../../interface/usager';
import { MessageService } from 'primeng/api';
import { UsagerService } from 'src/app/service/usager.service';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';

@Component({
  selector: 'app-liste-usagers',
  templateUrl: './liste-usagers.component.html',
  styleUrls: ['./liste-usagers.component.css'],
  providers: [MessageService]
})
export class ListeUsagersComponent implements OnInit {

  listeUsagers: Usager[];
  usagerConnecte: Usager;

  constructor(
    private usagerService: UsagerService,
    private messageService: MessageService,
    private dialogService: DialogEmpruntModalService
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

  openDialog(usager: Usager){
    this.dialogService.openDialogEditerRole(usager)
    .afterClosed().subscribe((res) => {
      if(res){
        this.getAllUsagers();
      }
    });
  }
}
