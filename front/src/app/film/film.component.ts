import {
  Component,
  OnInit
} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {MOVIES} from '../graphql/graphql.movies';
import {CATEGORIES} from "../graphql/graphql.categories";
import {FILMINBASKET} from "../graphql/graphql.basket";
import {ActivatedRoute, Router} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';
import {ADDTOBASKET} from "../graphql/graphql.mutations";

// @ts-ignore
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})

export class FilmComponent implements OnInit{

  reset = ""
  // @ts-ignore
  ismovie : boolean;
  // 3 things I need to talk with the graphql api
  movies : any[] = [];
  loading = true;
  error : any;

  categories : any[] = [];

  selectedCategories : number[] = [];
  title : string = ""

  selectedMovies : number[] = [];

  token = sessionStorage.getItem('token') || "";

  constructor(private apollo : Apollo, private route : ActivatedRoute, private _router : Router) {
  }

  categoriesApollo()
  {
    this.apollo
      .watchQuery({
        query : CATEGORIES,
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        }
      }).valueChanges.subscribe((result : any) => {
        this.categories = result?.data?.categories;
    });
  }

  apolloCheck(){
    this.apollo
      .watchQuery({
        query : MOVIES,
        variables : {
          film_title :  this.title,
          film_category :  this.selectedCategories,
        },
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        }
      }).valueChanges.subscribe((result : any) => {
      this.movies = result?.data?.movies;
      this.loading = result.loading;
      this.error = result.error;
    });

  }


  apolloAddToBasket(film_id: number){
    this.apollo
      .mutate({
        mutation : ADDTOBASKET,
        variables : {
          film_id :  film_id
        },
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        },
        refetchQueries: [FILMINBASKET],
      }).subscribe((result : any) => {
        console.log(result)

    });
  }

  apolloFilmInBasket(){
    this.apollo
      .watchQuery({
        query : FILMINBASKET,
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        },

      }).valueChanges.subscribe((result : any) => {
        this.selectedMovies = result?.data?.basket?.film.map((a: { film_id: any; }) => a.film_id) ;
        this.loading = result.loading;
        this.error = result.error;

    });
  }

  ngOnInit(): void {
    this.categoriesApollo();
    this.apolloCheck()
    this.apolloFilmInBasket();
  }


// Taking the string of the filter -> HTMLInputElement is a casting
  onInput(event : Event) {
    this.reset = (<HTMLInputElement>event.target).value
    this.title = ""
    this.selectedCategories = []
    this.apolloCheck()
  }

  onClickBook(e : any, film_id : number) {
    this.apolloAddToBasket(film_id)
  }

  isIdInSelectedMovies(film_id : number) {
    return this.selectedMovies.includes(film_id);
  }


  onSearch(name : any)
  {
    this.title = name.target.value
    this.apolloCheck()
  }

  onSearchCat(selected: boolean, category_id : number) {

    if (selected){
      this.selectedCategories = [category_id]
    }else{
      this.selectedCategories = []
    }

    this.apolloCheck()
  }
}
