import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FilmComponent} from "./film/film.component";
import {LoginComponent} from "./login/login.component";
import {FilmFormComponent} from "./film-form/film-form.component";
import {RentalHistoryComponent} from "./rental-history/rental-history.component";

// essenzialmente app-routing è la "zona di lavoro" della web-app

// tutti le "pagine" delle mie routes
const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'films', component : FilmComponent},
  {path : 'films/filmForm/:title', component : FilmFormComponent},
  {path : 'history', component : RentalHistoryComponent}
];

@NgModule({
  // in tutta l'applicazione vado a implementare o esportare routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
