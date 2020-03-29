import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmprunterModalComponent } from '../component/modal/emprunter-modal/emprunter-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogEmpruntModalService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(prenom: string, titre: string){
    return this.dialog.open(EmprunterModalComponent, {
      width: '450px',
      data: { name: prenom, titre: titre },
      position: { top: "15px"}
    });
  }
}
