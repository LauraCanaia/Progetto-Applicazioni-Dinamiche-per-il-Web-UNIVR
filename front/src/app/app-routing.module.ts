import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FilmComponent} from "./film/film.component";
import {LoginComponent} from "./login/login.component";
import {FilmFormComponent} from "./film-form/film-form.component";

// essenzialmente app-routing è la "zona di lavoro" della web-app

// tutti le "pagine" delle mie routes
const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'films', component : FilmComponent},
  {path : 'films/filmForm', component : FilmFormComponent}
];

@NgModule({
  // in tutta l'applicazione vado a implementare o esportare routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
