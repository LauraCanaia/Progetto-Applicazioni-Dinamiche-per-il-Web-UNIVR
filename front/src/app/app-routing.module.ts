import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {FilmComponent} from "./film/film.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path : 'Login', component : LoginComponent},
  {path : 'Film', component : FilmComponent}
];

@NgModule({
  // in tutta l'applicazione vado a implementare o esportare routes
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
