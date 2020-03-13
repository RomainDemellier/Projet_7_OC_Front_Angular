import { Component, OnInit } from '@angular/core';
import { LivreService } from 'src/app/livre.service';
import { Livre } from 'src/app/livre';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization.service';

@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {

  livres: Livre[];
  token: String;

  constructor(
    private livreService: LivreService,
    private authorizationService: AuthorizationService) { }

  ngOnInit() {
    this.token = this.authorizationService.getToken();
    this.getLivres(this.token);
  }

  getLivres(token): void {
    this.livreService.getLivresDisponibles(token).subscribe(livres => this.livres = livres);
  }
}
