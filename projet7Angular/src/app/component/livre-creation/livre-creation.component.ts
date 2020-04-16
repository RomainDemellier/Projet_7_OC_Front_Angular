// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { $ } from 'protractor';
// import { AuthorizationService } from 'src/app/service/authorization.service';
// import { AuteurService } from 'src/app/service/auteur.service';
// import { LivreService } from 'src/app/service/livre.service';
// import { Auteur } from 'src/app/interface/auteur';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Livre } from 'src/app/interface/livre';
// import { onlyNumbers } from 'src/app/validators/nombre.validator';
// import { MessageService } from 'primeng/api';

// @Component({
//   selector: 'app-livre-creation',
//   templateUrl: './livre-creation.component.html',
//   styleUrls: ['./livre-creation.component.scss'],
//   providers: [MessageService]
// })
// export class LivreCreationComponent implements OnInit {

//   livreCreationForm: FormGroup;
//   auteurExiste: Boolean = true;
//   auteurListe: Auteur[];

//   get titre(){
//     return this.livreCreationForm.get('titre');
//   }

//   get genre(){
//     return this.livreCreationForm.get('genre');
//   }

//   get nbreExemplaires(){
//     return this.livreCreationForm.get('nbreExemplaires');
//   }

//   get auteur(){
//     return this.livreCreationForm.get('auteur');
//   }

//   get prenom(){
//     return this.livreCreationForm.get('auteurCreer').get('prenom');
//   }

//   get nom(){
//     return this.livreCreationForm.get('auteurCreer').get('nom');
//   }

//   get estDansListe(){
//     return this.livreCreationForm.get('estDansListe');
//   }

//   constructor(
//     private fb: FormBuilder,
//     private authorizationService: AuthorizationService,
//     private auteurService: AuteurService,
//     private livreService: LivreService,
//     private messageService: MessageService
//   ) { 
//    }

//   ngOnInit(): void {
//     this.livreCreationForm = this.fb.group({
//       titre: ['', [Validators.required]],
//       genre: ['', [Validators.required]],
//       nbreExemplaires: ['', [Validators.required, onlyNumbers]],
//       auteur: ['', [Validators.required]],
//       estDansListe: ["true", []],
//       auteurCreer: this.fb.group({
//         prenom: ['', []],
//         nom: ['', []]
//       })
//     });

//     this.estDansListe.valueChanges.subscribe(() => {
//       const existe = this.estDansListe.value;
//       console.log(existe);
//       if(existe === "true"){
//         console.log("existe");
//         this.auteur.setValidators(Validators.required);
//         this.prenom.clearValidators();
//         this.nom.clearValidators();
//       } else {
//         console.log("existe pas");
//         this.prenom.setValidators(Validators.required);
//         this.nom.setValidators(Validators.required);
//         this.auteur.clearValidators();
//       }
//       this.auteur.updateValueAndValidity();
//       this.nom.updateValueAndValidity();
//       this.prenom.updateValueAndValidity();
//     });

//     this.auteurService.getAllAuteurs().subscribe((auteurListe => {
//       this.auteurListe = auteurListe;
//     }))
//   }

//   onChange(){
//     //console.log(this.estDansListe.value);
//     this.auteurExiste = !this.auteurExiste;
//     if(!this.auteurExiste){
//       this.auteur.disable();
//     } else {
//       this.auteur.enable();
//     }
//   }

//   onSubmit(){
//     if(this.auteurExiste){
//       const auteurId = +this.auteur.value;
//       console.log(auteurId);
//       this.auteurService.getAteurById(auteurId).subscribe((aut) => {
//         const a: Auteur = aut;
//         console.log(a);
//         const livre: Livre = {
//           id: null,
//           titre: this.titre.value,
//           auteur: a,
//           genre: this.genre.value,
//           nbreExemplaires: this.nbreExemplaires.value,
//           fullNameAuteur: null
//         }
//         console.log(livre);
//         this.livreService.createLivre(livre).subscribe((l) => {
//           console.log(l);
//         })
//       });
//     } else {
//       const auteurCreer: Auteur = {
//         id: null,
//         nom: this.nom.value,
//         prenom: this.prenom.value
//       }

//       this.auteurService.createAuteur(auteurCreer).subscribe((a) => {
//         console.log(a);
//         const livre: Livre = {
//           id: null,
//           titre: this.titre.value,
//           auteur: a,
//           genre: this.genre.value,
//           nbreExemplaires: this.nbreExemplaires.value,
//           fullNameAuteur: null
//         }
//         this.livreService.createLivre(livre).subscribe((l) => {
//           console.log(l);
//         })
//       });
//     }
//   }

//   showToast(severity, summary, detail){
//     this.messageService.add({severity: severity, summary: summary, detail: detail});
//   }
// }
