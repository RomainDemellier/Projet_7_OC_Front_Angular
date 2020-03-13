import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usager } from './usager';

@Injectable({
  providedIn: 'root'
})
export class UsagerService {

  private apiUrl = 'http://localhost:8080/api/usager';

  constructor(
    private http: HttpClient
  ) { }

  createUsager(usager: Usager): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        //'Authorization': 'Bearer'
      })
    };
    return this.http.post<Usager>(this.apiUrl + '/create',usager,httpOptions);
  }
}
