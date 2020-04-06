import { Component, OnInit } from '@angular/core';
import { Usager } from '../../interface/usager';
import { UsagerService } from '../../service/usager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
// import { MessageService } from 'primeng/api/public_api';

@Component({
  selector: 'app-usager-editer-role',
  templateUrl: './usager-editer-role.component.html',
  styleUrls: ['./usager-editer-role.component.scss'],
  providers: [MessageService]
})
export class UsagerEditerRoleComponent implements OnInit {

  usager: Usager;
  editerRoleForm: FormGroup;

  get nom(){
    return this.editerRoleForm.get('nom');
  }

  get prenom(){
    return this.editerRoleForm.get('prenom');
  }

  get email(){
    return this.editerRoleForm.get('email');
  }

  get id(){
    return this.editerRoleForm.get('id');
  }

  constructor(
    private usagerService: UsagerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const id = + this.route.snapshot.paramMap.get('id');
    this.usagerService.getById(id).subscribe((usager) =>{
      this.usager = usager;
      console.log(this.usager);
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
    });
  }

  onSubmit(){
    console.log(this.editerRoleForm.value);
    this.usagerService.editRole(this.editerRoleForm.value).subscribe((usager) => {
      console.log("usager role édité");
      console.log(usager);
      this.router.navigate(['/home/usagers']);
    });
  }

  showToast(severity, summary, detail){
    this.messageService.add({severity: severity, summary: summary, detail: detail});
  }
}
