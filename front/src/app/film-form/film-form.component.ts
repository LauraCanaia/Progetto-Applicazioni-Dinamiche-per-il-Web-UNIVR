import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {MOVIE} from "../graphql/graphql.movie";
import {query} from "@angular/animations";

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit{

  movies: any[] = [];
  constructor(private apollo : Apollo){
  }

  ngOnInit(): void {
    this.apollo.watchQuery({
      query : MOVIE,
      variables : {film_id : 133}}
    ).valueChanges.subscribe((data : any) =>
    {
      this.movies = data;
    });
  }
}
