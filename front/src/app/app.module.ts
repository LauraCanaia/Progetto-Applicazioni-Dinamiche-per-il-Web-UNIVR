import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmComponent } from './film/film.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from "@angular/material/button";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

// modules
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { NavbarComponent } from './navbar/navbar.component';
import { FilmFormComponent } from './film-form/film-form.component';
import { RentalHistoryComponent } from './rental-history/rental-history.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatChipsModule} from "@angular/material/chips";
import { NotfoundComponent } from './errori/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmComponent,
    LoginComponent,
    NavbarComponent,
    FilmFormComponent,
    RentalHistoryComponent,
    NotfoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        GraphQLModule,
        HttpClientModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatChipsModule

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
