import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auteur } from 'src/app/interface/auteur';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { AuteurService } from 'src/app/service/auteur.service';
import { LivreService } from 'src/app/service/livre.service';
import { MessageService } from 'primeng/api';
import { onlyNumbers } from 'src/app/validators/nombre.validator';
import { Livre } from 'src/app/interface/livre';
import { DialogEmpruntModalService } from 'src/app/service/dialog-emprunt-modal.service';
import { MatDialogRef } from '@angular/material/dialog';
import { error } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-livre-creation-modal',
  templateUrl: './livre-creation-modal.component.html',
  styleUrls: ['./livre-creation-modal.component.css']
})
export class LivreCreationModalComponent implements OnInit {

  public livreCreationForm: FormGroup;
  public auteurExiste: Boolean = true;
  public auteurListe: Auteur[];

  public get titre() {
    return this.livreCreationForm.get('titre');
  }

  public get genre() {
    return this.livreCreationForm.get('genre');
  }

  public get nbreExemplaires() {
    return this.livreCreationForm.get('nbreExemplaires');
  }

  public get auteur() {
    return this.livreCreationForm.get('auteur');
  }

  public get prenom() {
    return this.livreCreationForm.get('auteurCreer').get('prenom');
  }

  public get nom() {
    return this.livreCreationForm.get('auteurCreer').get('nom');
  }

  public get estDansListe() {
    return this.livreCreationForm.get('estDansListe');
  }

  constructor(
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private auteurService: AuteurService,
    private livreService: LivreService,
    public dialogRef: MatDialogRef<LivreCreationModalComponent>
    //private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.livreCreationForm = this.fb.group({
      titre: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      nbreExemplaires: ['', [Validators.required, onlyNumbers]],
      auteur: ['', [Validators.required]],
      estDansListe: ["true", []],
      auteurCreer: this.fb.group({
        prenom: ['', []],
        nom: ['', []]
      })
    });

    this.estDansListe.valueChanges.subscribe(() => {
      const existe = this.estDansListe.value;
      console.log(existe);
      if (existe === "true") {
        console.log("existe");
        this.auteur.setValidators(Validators.required);
        this.prenom.clearValidators();
        this.nom.clearValidators();
      } else {
        console.log("existe pas");
        this.prenom.setValidators(Validators.required);
        this.nom.setValidators(Validators.required);
        this.auteur.clearValidators();
      }
      this.auteur.updateValueAndValidity();
      this.nom.updateValueAndValidity();
      this.prenom.updateValueAndValidity();
    });

    this.auteurService.getAllAuteurs().subscribe((auteurListe => {
      this.auteurListe = auteurListe;
    }))
  }

  public onChange(): void {
    //console.log(this.estDansListe.value);
    this.auteurExiste = !this.auteurExiste;
    if (!this.auteurExiste) {
      this.auteur.disable();
    } else {
      this.auteur.enable();
    }
  }

  public onSubmit(): void {
    if (this.auteurExiste) {
      const auteurId = +this.auteur.value;
      console.log(auteurId);
      this.auteurService.getAteurById(auteurId).subscribe((aut) => {
        const a: Auteur = aut;
        console.log(a);
        const livre: Livre = {
          id: null,
          titre: this.titre.value,
          auteur: a,
          genre: this.genre.value,
          nbreExemplaires: this.nbreExemplaires.value,
          fullNameAuteur: null
        }
        console.log(livre);
        this.livreService.createLivre(livre).subscribe((l) => {
          console.log(l);
          this.dialogRef.close(true);
        }, (error: HttpErrorResponse) => {
          this.dialogRef.close(true);
        })
      });
    } else {
      const auteurCreer: Auteur = {
        id: null,
        nom: this.nom.value,
        prenom: this.prenom.value
      }

      this.auteurService.createAuteur(auteurCreer).subscribe((a) => {
        console.log(a);
        const livre: Livre = {
          id: null,
          titre: this.titre.value,
          auteur: a,
          genre: this.genre.value,
          nbreExemplaires: this.nbreExemplaires.value,
          fullNameAuteur: null
        }
        this.livreService.createLivre(livre).subscribe((l) => {
          console.log(l);
          this.dialogRef.close(true);
        }, (error: HttpErrorResponse) => {
          this.dialogRef.close(false);
        });
      });
    }
  }
  

  public closeDialog(): void {
    this.dialogRef.close("exit");
  }
}
