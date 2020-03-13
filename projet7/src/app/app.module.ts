import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsagerComponent } from './usager/usager.component';
import { SignInComponent } from './usager/sign-in/sign-in.component';
import { SignUpComponent } from './usager/sign-up/sign-up.component';
import { appRoutes } from './route';
import { LivreComponent } from './home/livre/livre.component';
import { EmpruntComponent } from './home/emprunt/emprunt.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsagerComponent,
    SignInComponent,
    SignUpComponent,
    LivreComponent,
    EmpruntComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
