import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsagerComponent } from './usager/usager.component';
import { SignUpComponent } from './usager/sign-up/sign-up.component';
import { SignInComponent } from './usager/sign-in/sign-in.component';
import { LivreComponent } from './home/livre/livre.component';
import { EmpruntComponent } from './home/emprunt/emprunt.component';

export const appRoutes : Routes = [
    { 
        path: 'home', component: HomeComponent,
        children: [{ path: 'livres', component: LivreComponent },
                   { path: 'emprunts', component: EmpruntComponent },
                   { path: '', redirectTo:'/home/livres', pathMatch: 'full' }
    ]
    },
     {
         path: 'signup', component: UsagerComponent,
         children: [{ path: '', component: SignUpComponent }]
     },
     {
        path: 'login', component: UsagerComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path: '', redirectTo:'/login', pathMatch: 'full' }
];