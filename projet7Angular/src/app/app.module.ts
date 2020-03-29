import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastModule } from 'primeng/toast'; 

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { UsagerComponent } from './component/usager/usager.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { appRoutes } from './route';
import { ListeLivresComponent } from './component/liste-livres/liste-livres.component';
import { EmpruntComponent } from './component/emprunt/emprunt.component';
import { from } from 'rxjs';
import { EmpruntDetailsComponent } from './emprunt-details/emprunt-details.component';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { LivreCreationComponent } from './component/livre-creation/livre-creation.component';
import { EmprunterModalComponent } from './component/modal/emprunter-modal/emprunter-modal.component';
import { ListeUsagersComponent } from './liste-usagers/liste-usagers.component';
import { UsagerEditerRoleComponent } from './usager-editer-role/usager-editer-role.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsagerComponent,
    SignInComponent,
    SignUpComponent,
    ListeLivresComponent,
    EmpruntComponent,
    EmpruntDetailsComponent,
    LivreCreationComponent,
    EmprunterModalComponent,
    ListeUsagersComponent,
    UsagerEditerRoleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [EmprunterModalComponent]
})
export class AppModule { }
