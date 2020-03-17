import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprunt } from '../interface/emprunt';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  private apiUrl: string = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient
  ) { }


  createEmprunt(emprunt: Emprunt, token: string): Observable<Emprunt>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    
    return this.http.post<Emprunt>(this.apiUrl + '/emprunt/create', emprunt, httpOptions);
  }
  
  getEmpruntsUsagerConnecte(token: string): Observable<Emprunt[]> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + token
        })
      };

      return this.http.get<Emprunt[]>(this.apiUrl + '/usager/emprunts', httpOptions);
    }
}
