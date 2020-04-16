import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usager } from 'src/app/interface/usager';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsagerService } from 'src/app/service/usager.service';

@Component({
  selector: 'app-editer-role-usager',
  templateUrl: './editer-role-usager.component.html',
  styleUrls: ['./editer-role-usager.component.scss']
})
export class EditerRoleUsagerComponent implements OnInit {

  public usager: Usager;
  public editerRoleForm: FormGroup;

  public get nom(){
    return this.editerRoleForm.get('nom');
  }

  public get prenom(){
    return this.editerRoleForm.get('prenom');
  }

  public get email(){
    return this.editerRoleForm.get('email');
  }

  public get id(){
    return this.editerRoleForm.get('id');
  }

  constructor(
    private fb: FormBuilder,
    private usagerService: UsagerService,
    public dialogRef: MatDialogRef<EditerRoleUsagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.usager = this.data.usager;
    this.editerRoleForm = this.fb.group({
      id: [this.usager.id, []],
      nom: [this.usager.nom, []],
      prenom: [this.usager.prenom, []],
      email: [this.usager.email, []],
      role: [this.usager.role, []]
    });
    this.nom.disable();
    this.prenom.disable();
    this.email.disable();
  }

  public onSubmit(): void{
    console.log(this.editerRoleForm.value);
    this.usagerService.editRole(this.editerRoleForm.value).subscribe((usager) => {
      this.dialogRef.close(true);
    });
  }

  public closeDialog(): void{
    this.dialogRef.close("exit");
  }
}
