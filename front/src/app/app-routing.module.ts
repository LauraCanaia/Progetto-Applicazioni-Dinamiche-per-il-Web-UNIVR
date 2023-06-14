import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FilmComponent} from "./film/film.component";
import {LoginComponent} from "./login/login.component";
import {RentalHistoryComponent} from "./rental-history/rental-history.component";
import {BasketComponent} from "./basket/basket.component";

// essenzialmente app-routing è la "zona di lavoro" della web-app

// tutti le "pagine" delle mie routes
const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'films', component : FilmComponent},
  {path : 'history', component : RentalHistoryComponent},
  {path : 'basket', component : BasketComponent}
];

@NgModule({
  // in tutta l'applicazione vado a implementare o esportare routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
