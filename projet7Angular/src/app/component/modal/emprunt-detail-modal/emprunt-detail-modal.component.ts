import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Emprunt } from 'src/app/interface/emprunt';
import { EmpruntService } from 'src/app/service/emprunt.service';

@Component({
  selector: 'app-emprunt-detail-modal',
  templateUrl: './emprunt-detail-modal.component.html',
  styleUrls: ['./emprunt-detail-modal.component.css']
})
export class EmpruntDetailModalComponent implements OnInit {

  emprunt: Emprunt;

  constructor(
    private empruntService: EmpruntService,
    public dialogRef: MatDialogRef<EmpruntDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.emprunt = this.data.emprunt;
  }

  prolonger() {
    if (this.emprunt.prolonge) {
      this.dialogRef.close("prolongationPasOk");
    } else {
      this.empruntService.prolonger(this.emprunt.id).subscribe((emprunt) => {
        //this.router.navigate(['/home/emprunts']);
        this.dialogRef.close("prolongationOk");
      });
    }

  }

  rendre() {
    this.empruntService.rendre(this.emprunt.id).subscribe((emprunt) => {
      //this.router.navigate(['/home']);
      this.dialogRef.close("rendreOk");
    });
  }

  closeDialog() {
    this.dialogRef.close("exit");
  }
}
