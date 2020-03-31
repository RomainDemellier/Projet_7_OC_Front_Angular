import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { UsagerComponent } from './component/usager/usager.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { ListeLivresComponent } from './component/liste-livres/liste-livres.component';
import { EmpruntComponent } from './component/emprunt/emprunt.component';
import { EmpruntDetailsComponent } from './component/emprunt-details/emprunt-details.component';
import { LivreCreationComponent } from './component/livre-creation/livre-creation.component';
import { ListeUsagersComponent } from './component/liste-usagers/liste-usagers.component';
import { UsagerEditerRoleComponent } from './component/usager-editer-role/usager-editer-role.component';

export const appRoutes : Routes = [
    { 
        path: 'home', component: HomeComponent,
        children: [{ path: 'livres', component: ListeLivresComponent },
                   { path: 'emprunts', component: EmpruntComponent },
                   { path: 'usagers', component: ListeUsagersComponent },
                   { path: 'usager/role/:id', component: UsagerEditerRoleComponent },
                   { path: 'emprunt/details/:id', component: EmpruntDetailsComponent },
                   { path: 'livre-creation', component: LivreCreationComponent },
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