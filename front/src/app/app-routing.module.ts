import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FilmComponent} from "./film/film.component";
import {LoginComponent} from "./login/login.component";
import {FilmFormComponent} from "./film-form/film-form.component";

const routes: Routes = [
  {path : 'Login', component : LoginComponent},
  {path : '', component : FilmComponent},
  {path : 'filmForm', component : FilmFormComponent}
];

@NgModule({
  // in tutta l'applicazione vado a implementare o esportare routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
