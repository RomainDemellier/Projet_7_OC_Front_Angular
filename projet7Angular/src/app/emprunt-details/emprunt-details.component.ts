import { Component, OnInit } from '@angular/core';
import { EmpruntService } from '../service/emprunt.service';
import { Emprunt } from '../interface/emprunt';
import { UsagerService } from '../service/usager.service';
import { AuthorizationService } from '../service/authorization.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emprunt-details',
  templateUrl: './emprunt-details.component.html',
  styleUrls: ['./emprunt-details.component.css']
})
export class EmpruntDetailsComponent implements OnInit {

  emprunt: Emprunt;

  constructor(
    private empruntService: EmpruntService,
    private usagerService: UsagerService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getEmprunt();
  }

  getEmprunt(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.empruntService.getEmpruntById(id).subscribe((emprunt) => {
      this.emprunt = emprunt;
      console.log("emprunt : " + emprunt);
    });
  }

  prolonger(id: number){
    this.empruntService.prolonger(id).subscribe(() => {
      this.router.navigate(['/home/emprunts']);
    });
  }

  rendre(id: number){
    this.empruntService.rendre(id).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

}
