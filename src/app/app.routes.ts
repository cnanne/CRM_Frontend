import { Routes } from '@angular/router';
import { ComercialComponent} from "./comercial/comercial.component";
import { GerenteComercialComponent} from "./gerente-comercial/gerente-comercial.component";
import { UserLoginComponent } from './user-login/user-login.component';
import { authGuard } from './auth-guard.guard';





//archivo para rutas de la aplicacion.  Solo se ponen las rutas principales, el resto es routeless
export const routes: Routes = [
  {path: 'comercial', component: ComercialComponent, canActivate: [authGuard]},
  {path: 'gerente', component: GerenteComercialComponent, canActivate: [authGuard]},
  {path: 'login', component: UserLoginComponent},
  {path: '', redirectTo:'/comercial',pathMatch: 'full'},
  {path: '**', redirectTo: ''},
];
