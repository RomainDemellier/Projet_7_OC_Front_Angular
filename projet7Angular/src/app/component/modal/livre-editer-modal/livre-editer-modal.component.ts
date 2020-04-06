import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/service/authorization.service';
import { AuteurService } from 'src/app/service/auteur.service';
import { LivreService } from 'src/app/service/livre.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Auteur } from 'src/app/interface/auteur';
import { onlyNumbers } from 'src/app/validators/nombre.validator';
import { Livre } from 'src/app/interface/livre';
import { error } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-livre-editer-modal',
  templateUrl: './livre-editer-modal.component.html',
  styleUrls: ['./livre-editer-modal.component.scss']
})
export class LivreEditerModalComponent implements OnInit {

  livreEditionForm: FormGroup;
  livre: Livre;
  auteurExiste: Boolean = true;
  auteurListe: Auteur[];
  texte: string;

  get titre() {
    return this.livreEditionForm.get('titre');
  }

  get genre() {
    return this.livreEditionForm.get('genre');
  }

  get nbreExemplaires() {
    return this.livreEditionForm.get('nbreExemplaires');
  }

  get auteur() {
    return this.livreEditionForm.get('auteur');
  }

  get nbreExemplairesAjoutRetrait() {
    return this.livreEditionForm.get('nbreExemplairesAjoutRetrait');
  }

  get ajoutOuRetrait() {
    return this.livreEditionForm.get('ajoutOuRetrait');
  }

  constructor(
    private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private auteurService: AuteurService,
    private livreService: LivreService,
    public dialogRef: MatDialogRef<LivreEditerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    this.texte = "Nombre d'exemplaires à ajouter";
    this.livre = this.data.livre;
    this.livreEditionForm = this.fb.group({
      id: [this.livre.id, []],
      titre: [this.livre.titre, [Validators.required]],
      genre: [this.livre.genre, [Validators.required]],
      nbreExemplaires: [this.livre.nbreExemplaires, [Validators.required, onlyNumbers]],
      auteur: [this.livre.fullNameAuteur, [Validators.required]],
      nbreExemplairesAjoutRetrait: ['' ,[Validators.required, onlyNumbers]],
      ajoutOuRetrait: ['ajout', []]
    });

    this.titre.disable();
    this.genre.disable();
    this.genre.disable();
    this.auteur.disable();
    this.nbreExemplaires.disable();

    this.auteurService.getAllAuteurs().subscribe((auteurs) => {
      this.auteurListe = auteurs;
    });
  }

  onChange(){
    if(this.ajoutOuRetrait.value === "ajout"){
      this.texte = "Nombre d'exemplaires à ajouter";
    } else {
      this.texte = "Nombre d'exemplaires à soustraire";
    }
  }

  onSubmit(){
    if(this.ajoutOuRetrait.value === "ajout") {
      this.livre.nbreExemplaires = this.livre.nbreExemplaires + +this.nbreExemplairesAjoutRetrait.value;
      this.livreService.editNbreExemplaires(this.livre).subscribe((livre) => {
        this.dialogRef.close(true);
      }, (error: HttpErrorResponse) => {
        this.dialogRef.close(false);
      });
    } else {
      if(this.livre.nbreExemplaires - this.nbreExemplairesAjoutRetrait.value >= 0){
        this.livre.nbreExemplaires = this.livre.nbreExemplaires - +this.nbreExemplairesAjoutRetrait.value;
        this.livreService.editNbreExemplaires(this.livre).subscribe((livre) => {
          this.dialogRef.close(true);
        }, (error: HttpErrorResponse) => {
          this.dialogRef.close(false);
        });
      }
    }
  }

  closeDialog(){
    this.dialogRef.close("exit");
  }
}
