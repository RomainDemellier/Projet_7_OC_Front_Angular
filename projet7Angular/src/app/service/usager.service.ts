import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usager } from '../interface/usager';
import { UsagerRegistration } from '../interface/usager-registration';
import { environment, apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsagerService {

  // private apiUrl = 'http://localhost:8080/api/usager';
  private apiUrl = apiUrl + '/api/usager';

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

  getById(id: number): Observable<Usager>{
    return this.http.get<Usager>(this.apiUrl + '/' + id);
  }

  getUsagerConnecte(): Observable<Usager> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + token
    //   })
    // };
    return this.http.get<Usager>(this.apiUrl + '/connecte');
  }

  getAllUsagers(): Observable<Usager[]>{
    return this.http.get<Usager[]>(this.apiUrl);
  }

  editRole(usager: Usager): Observable<Usager>{
    return this.http.put<Usager>(this.apiUrl + '/update/role', usager);
  }

  editProfil(usager: Usager): Observable<Usager> {
    return this.http.put<Usager>(this.apiUrl + '/update/profil', usager);
  }
}
