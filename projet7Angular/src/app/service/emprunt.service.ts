import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprunt } from '../interface/emprunt';
import { environment, apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  // private apiUrl: string = 'http://localhost:8080/api';
  private apiUrl: string = apiUrl + '/api';

  constructor(
    private http: HttpClient
  ) { }


  createEmprunt(emprunt: Emprunt): Observable<Emprunt>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + token
    //   })
    // };
    
    return this.http.post<Emprunt>(this.apiUrl + '/emprunt/create', emprunt);
  }
  
  getEmpruntsUsagerConnecte(token: string): Observable<Emprunt[]> {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'application/json',
      //     'Authorization': 'Bearer ' + token
      //   })
      // };

      return this.http.get<Emprunt[]>(this.apiUrl + '/usager/emprunts');
    }

    getEmpruntById(id: number): Observable<Emprunt> {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'application/json',
      //     'Authorization': 'Bearer ' + token
      //   })
      // };
      return this.http.get<Emprunt>(this.apiUrl + '/emprunt/' + id);
    }

    prolonger(id: number): Observable<Emprunt>{
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'application/json',
      //     'Authorization': 'Bearer ' + token
      //   })
      // };
      return this.http.put<any>(this.apiUrl + '/emprunt/prolonger/' + id, null);
    }

    rendre(id: number): Observable<Emprunt>{
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'application/json',
      //     'Authorization': 'Bearer ' + token
      //   })
      // };
      return this.http.delete<Emprunt>(this.apiUrl + '/emprunt/delete/' + id);
    }
}
