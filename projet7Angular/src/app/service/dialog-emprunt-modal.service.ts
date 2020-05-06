import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usager } from '../interface/usager';
import { EditerUsagerComponent } from '../component/modal/editer-usager/editer-usager.component';
import { Emprunt } from '../interface/emprunt';
import { EmpruntDetailModalComponent } from '../component/modal/emprunt-detail-modal/emprunt-detail-modal.component';
import { Livre } from '../interface/livre';

@Injectable({
  providedIn: 'root'
})
export class DialogEmpruntModalService {

  constructor(
    private dialog: MatDialog
  ) { }

  public openDialogEditer(usager: Usager){
    return this.dialog.open(EditerUsagerComponent, {
      width: '550px',
      disableClose: true,
      data: { usager: usager },
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
}
