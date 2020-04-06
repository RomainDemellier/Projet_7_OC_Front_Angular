import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsagerService } from 'src/app/service/usager.service';
import { emailValidator } from 'src/app/validators/email.validator';
import { passwordValidator } from 'src/app/validators/password.validator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-admin-modal',
  templateUrl: './create-admin-modal.component.html',
  styleUrls: ['./create-admin-modal.component.css']
})
export class CreateAdminModalComponent implements OnInit {

  registrationForm: FormGroup;

  get nom(){
    return this.registrationForm.get('nom');
  }

  get prenom(){
    return this.registrationForm.get('prenom');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }

  constructor(
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private usagerService: UsagerService,
    public dialogRef: MatDialogRef<CreateAdminModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      nom: ['', [Validators.required, Validators.maxLength(15)]],
      prenom: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, emailValidator(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      confirmPassword: ['']
    }, { validator: passwordValidator });
  }



  onSubmit(){
    this.usagerService.createAdmin(this.registrationForm.value).subscribe(() => {
      console.log("Succès");
      //this.router.navigate([('/login')]);
      this.dialogRef.close(true);

    }, (err: HttpErrorResponse) => {
      console.log("Echec");
      this.dialogRef.close(false);
    });
  }

  closeDialog(){
    this.dialogRef.close("exit");
  }

}
