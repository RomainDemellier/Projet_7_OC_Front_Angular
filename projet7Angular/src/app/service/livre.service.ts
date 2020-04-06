import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from '../interface/livre';
import { environment, apiUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  // private apiUrl = 'http://localhost:8080/api/livre';
  private apiUrl = apiUrl + '/api/livre';

  constructor(private http: HttpClient) { }

  getLivresDisponibles(): Observable<Livre[]>{
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + bearer
    //   })
    // };
    return this.http.get<Livre[]>(this.apiUrl);
  }

  createLivre(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiUrl + '/create', livre);
  }

  editNbreExemplaires(livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(this.apiUrl + '/editNbreExemplaires', livre);
  }
}
