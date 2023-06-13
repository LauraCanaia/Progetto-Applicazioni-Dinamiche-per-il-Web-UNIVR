import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {query} from "@angular/animations";
import {Router} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit{

  movies: any[] = [];
  title : any;

  token = sessionStorage.getItem('token') || "";


 /*apolloCheck(title : string){
    this.apollo
      .watchQuery({
        query : MOVIE,
        variables : {
          film_title :  title,
        },
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        }
      }).valueChanges.subscribe((result : any) => {
        this.movies = result?.data?.movies;
    });

  }*/

  constructor(private apollo : Apollo, private router : Router){
  }

  ngOnInit(): void {
    this.title = this.router.url.split('/').pop()?.replace("%20", ' ');
    //this.apolloCheck(this.title.toString())
  }
}
