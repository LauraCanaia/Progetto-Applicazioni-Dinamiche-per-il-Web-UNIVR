import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {MOVIE} from "../graphql/graphql.movie";

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit{

  movie : any[] = [];
  constructor(private apollo : Apollo){
  }

  ngOnInit(): void {

    this.apollo
      .watchQuery({
        query : MOVIE,
        variables : {
          film_id :  133,
        }
      }).valueChanges.subscribe((result : any) => {
      this.movie = result?.data?.movie;
    });

    console.log(this.movie)
  }
}
