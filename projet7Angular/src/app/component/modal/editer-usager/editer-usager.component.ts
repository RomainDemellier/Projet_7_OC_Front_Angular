import { Component, OnInit, Inject, ComponentFactoryResolver } from '@angular/core';
import { Usager } from 'src/app/interface/usager';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/validators/email.validator';
import { UsagerService } from 'src/app/service/usager.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-editer-usager',
  templateUrl: './editer-usager.component.html',
  styleUrls: ['./editer-usager.component.css']
})
export class EditerUsagerComponent implements OnInit {

  editerUsagerForm: FormGroup;
  formActivation: Boolean = false;

  get nom(){
    return this.editerUsagerForm.get('nom');
  }

  get prenom(){
    return this.editerUsagerForm.get('prenom');
  }

  get email(){
    return this.editerUsagerForm.get('email');
  }

  constructor(
    private fb: FormBuilder,
    private usagerService: UsagerService,
    public dialogRef: MatDialogRef<EditerUsagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.editerUsagerForm = this.fb.group({
      id: [this.data.usager.id, []],
      nom: [this.data.usager.nom, [Validators.required, Validators.maxLength(15)]],
      prenom: [this.data.usager.prenom, [Validators.required, Validators.maxLength(15)]],
      email: [this.data.usager.email, [Validators.required, emailValidator(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)]],
    });

    this.prenom.disable();
    this.nom.disable();
    this.email.disable();
  }

  activate(){
    this.prenom.enable();
    this.nom.enable();
    this.email.enable();
    this.formActivation = true;
  }

  onSubmit(){
    this.usagerService.editProfil(this.editerUsagerForm.value).subscribe((usager) => {
      console.log(usager);
      this.dialogRef.close(true);
    }, (err: HttpErrorResponse) => {
      console.log("erreur");
      this.dialogRef.close(false);
    });
  }

  closeDialog(){
    this.dialogRef.close("exit");
  }

}
