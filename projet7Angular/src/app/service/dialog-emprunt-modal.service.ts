import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmprunterModalComponent } from '../component/modal/emprunter-modal/emprunter-modal.component';
import { Usager } from '../interface/usager';
import { EditerUsagerComponent } from '../component/modal/editer-usager/editer-usager.component';
import { EditerRoleUsagerComponent } from '../component/modal/editer-role-usager/editer-role-usager.component';
import { Emprunt } from '../interface/emprunt';
import { EmpruntDetailModalComponent } from '../component/modal/emprunt-detail-modal/emprunt-detail-modal.component';
import { Livre } from '../interface/livre';
import { LivreCreationModalComponent } from '../component/modal/livre-creation-modal/livre-creation-modal.component';
import { LivreEditerModalComponent } from '../component/modal/livre-editer-modal/livre-editer-modal.component';
import { CreateAdminModalComponent } from '../component/modal/create-admin-modal/create-admin-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DialogEmpruntModalService {

  constructor(
    private dialog: MatDialog
  ) { }

  public openDialog(prenom: string, titre: string){
    return this.dialog.open(EmprunterModalComponent, {
      width: '450px',
      disableClose: true,
      data: { name: prenom, titre: titre },
      position: { top: "15px"}
    });
  }

  public openDialogEditer(usager: Usager){
    return this.dialog.open(EditerUsagerComponent, {
      width: '550px',
      disableClose: true,
      data: { usager: usager },
    });
  }

  public openDialogEditerRole(usager: Usager){
    return this.dialog.open(EditerRoleUsagerComponent, {
      width: '450px',
      disableClose: true,
      data: { usager: usager }
    });
  }

  public openDialogEmpruntDetail(emprunt: Emprunt){
    console.log("Dans emprunt detail modal");
    return this.dialog.open(EmpruntDetailModalComponent, {
      width: '400px',
      disableClose: true,
      data: { emprunt: emprunt },
      panelClass: 'noPadding'
    });
  }

  public openDialogCreationLivre(){
    return this.dialog.open(LivreCreationModalComponent, {
      width: '550px',
      disableClose: true,
      panelClass: 'noPadding'
    });
  }

  public openDialogEditLivre(livre){
    return this.dialog.open(LivreEditerModalComponent, {
      width: '550px',
      disableClose: true,
      data: { livre: livre },
      panelClass: 'noPadding'
    });
  }

  public openDialogCreateAdmin(){
    return this.dialog.open(CreateAdminModalComponent, {
      width: '550px',
      disableClose: true,
      panelClass: 'noPadding'
    });
  }
}
