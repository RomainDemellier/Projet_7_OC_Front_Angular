import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-usager',
  templateUrl: './usager.component.html',
  styleUrls: ['./usager.component.scss']
})
export class UsagerComponent implements OnInit, AfterViewInit {

  test: Boolean = false;
  liste;
  constructor() { }
  ngAfterViewInit(): void {
    console.log("liste " + this.liste);
  }

  ngOnInit() {
    
  }

}
