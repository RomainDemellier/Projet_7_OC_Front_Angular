import { Component, OnInit, Inject, ComponentFactoryResolver } from '@angular/core';
import { Usager } from 'src/app/interface/usager';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interface/dialog-data';

@Component({
  selector: 'app-emprunter-modal',
  templateUrl: './emprunter-modal.component.html',
  styleUrls: ['./emprunter-modal.component.scss']
})
export class EmprunterModalComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<EmprunterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(false);
  }
}
