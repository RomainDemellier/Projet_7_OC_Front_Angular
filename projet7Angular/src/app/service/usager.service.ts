import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Usager } from '../interface/usager';
import { UsagerRegistration } from '../interface/usager-registration';
import { environment, apiUrl } from 'src/environments/environment';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UsagerService {

  // private apiUrl = 'http://localhost:8080/api/usager';
  private apiUrl = apiUrl + '/api/usager';

  constructor(
    private http: HttpClient,
    private authorizeService: AuthorizationService
  ) { }

  createUsager(usager: UsagerRegistration): Observable<any> {
    return this.http.post<UsagerRegistration>(this.apiUrl + '/create',usager);
  }

  createAdmin(admin: UsagerRegistration): Observable<any> {
    return this.http.post<UsagerRegistration>(this.apiUrl + '/createAdmin',admin);
  }

  getById(id: number): Observable<Usager>{
    return this.http.get<Usager>(this.apiUrl + '/' + id);
  }

  getUsagerConnecte(): Observable<Usager> {
    // if(this.authorizeService.getToken() === ''){
    //   return EMPTY;
    // } else {
    //   return this.http.get<Usager>(this.apiUrl + '/connecte');
    // } 
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
