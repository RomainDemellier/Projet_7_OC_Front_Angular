import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmprunterModalComponent } from '../component/modal/emprunter-modal/emprunter-modal.component';
import { Usager } from '../interface/usager';
import { EditerUsagerComponent } from '../component/modal/editer-usager/editer-usager.component';
import { EditerRoleUsagerComponent } from '../component/modal/editer-role-usager/editer-role-usager.component';
import { Emprunt } from '../interface/emprunt';
import { EmpruntDetailModalComponent } from '../component/modal/emprunt-detail-modal/emprunt-detail-modal.component';

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
      disableClose: true,
      data: { name: prenom, titre: titre },
      position: { top: "15px"}
    });
  }

  openDialogEditer(usager: Usager){
    return this.dialog.open(EditerUsagerComponent, {
      width: '550px',
      disableClose: true,
      data: { usager: usager },
    });
  }

  openDialogEditerRole(usager: Usager){
    return this.dialog.open(EditerRoleUsagerComponent, {
      width: '450px',
      disableClose: true,
      data: { usager: usager }
    });
  }

  openDialogEmpruntDetail(emprunt: Emprunt){
    return this.dialog.open(EmpruntDetailModalComponent, {
      width: '450px',
      disableClose: true,
      data: { emprunt: emprunt }
    });
  }
}
