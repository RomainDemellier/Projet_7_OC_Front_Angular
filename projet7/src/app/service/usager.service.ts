import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usager } from '../interface/usager';
import { UsagerRegistration } from '../interface/usager-registration';

@Injectable({
  providedIn: 'root'
})
export class UsagerService {

  private apiUrl = 'http://localhost:8080/api/usager';

  constructor(
    private http: HttpClient
  ) { }

  createUsager(usager: UsagerRegistration): Observable<any> {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     //'Authorization': 'Bearer'
    //   })
    // };
    return this.http.post<UsagerRegistration>(this.apiUrl + '/create',usager);
  }

  getUsagerConnecte(token: string): Observable<Usager> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + token
    //   })
    // };
    return this.http.get<Usager>(this.apiUrl + '/connecte');
  }
}
