import {Component, OnInit} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {MOVIES} from '../graphql/graphql.movies';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})

export class FilmComponent implements OnInit{

  // 3 things I need to talk with the graphql api
  movies : any[] = [];
  loading = true;
  error : any;

  constructor(private apollo : Apollo) {
  }

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query : MOVIES,
      }).valueChanges.subscribe((result : any) => {
        this.movies = result.post;
        this.loading = result.loading;
        this.error = result.error;
    });
  }

}
