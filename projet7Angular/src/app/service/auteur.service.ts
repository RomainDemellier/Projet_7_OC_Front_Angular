import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auteur } from '../interface/auteur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  private apiUrl: string = 'http://localhost:8080/api/auteur';

  constructor(private http: HttpClient) { }

  createAuteur(auteur: Auteur): Observable<Auteur>{
    return this.http.post<Auteur>(this.apiUrl + '/create', auteur);
  }

  getAllAuteurs(): Observable<Auteur[]>{
    return this.http.get<Auteur[]>(this.apiUrl);
  }
  getAteurById(id: number): Observable<Auteur>{
    console.log(id);
    console.log(typeof id);
    return this.http.get<Auteur>(this.apiUrl + '/' + id);
  }
}
