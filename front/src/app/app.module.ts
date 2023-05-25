import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from "@angular/material/button";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {ProvaComponent} from "./prova/prova.component";

// modules
import {MatCardModule} from '@angular/material/card';
import {FilmComponent} from "./film/film.component";

@NgModule({
  declarations: [
    AppComponent,
    ProvaComponent,
    FilmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    GraphQLModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
