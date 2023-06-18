import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FilmComponent} from "./film/film.component";
import {LoginComponent} from "./login/login.component";
import {RentalHistoryComponent} from "./rental-history/rental-history.component";
import {BasketComponent} from "./basket/basket.component";
import {NotfoundComponent} from "./errori/notfound/notfound.component";
import {AuthGuard} from "./auth/auth.guard";

// essenzialmente app-routing è la "zona di lavoro" della web-app

// tutti le "pagine" delle mie routes
const routes: Routes = [
  {path : '', pathMatch : 'full' ,redirectTo : 'login'},
  {path : 'login', component : LoginComponent},
  {path : 'films', component : FilmComponent, canActivate : [AuthGuard]},
  {path : 'history', component : RentalHistoryComponent, canActivate : [AuthGuard]},
  {path : 'basket', component : BasketComponent, canActivate : [AuthGuard]},
  {path : '404', component : NotfoundComponent},
  {path : '**', redirectTo : '/404'}
];

@NgModule({
  // in tutta l'applicazione vado a implementare o esportare routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
