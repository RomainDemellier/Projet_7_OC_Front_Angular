import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../interface/livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private apiUrl = 'http://localhost:8080/api/livre';

  constructor(private http: HttpClient) { }

  getLivresDisponibles(bearer): Observable<Livre[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + bearer
      })
    };
    return this.http.get<Livre[]>(this.apiUrl, httpOptions);
  }
}
