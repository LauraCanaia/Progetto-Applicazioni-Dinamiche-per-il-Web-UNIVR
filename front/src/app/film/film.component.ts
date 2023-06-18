import {
  Component,
  OnInit, ViewChild
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

  limit = 10;
  offset = 0;

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

  apolloCheck(passedLimit : number , passedOffset : number){
    this.apollo
      .watchQuery({
        query : MOVIES,
        variables : {
          film_title :  this.title,
          film_category :  this.selectedCategories,
          only_available : true,
          limit: passedLimit,
          offset: passedOffset
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
    this.apolloCheck(this.limit, this.offset)
    this.apolloFilmInBasket();
  }


// Taking the string of the filter -> HTMLInputElement is a casting
  onInput(event : Event) {
    this.reset = (<HTMLInputElement>event.target).value
    this.title = ""
    this.selectedCategories.pop();
    this.apolloCheck(this.limit, this.offset)
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
    this.apolloCheck(this.limit, this.offset)
  }

  onSearchCat(selected: boolean, category_id : number) {

    if (selected){
      this.selectedCategories = [category_id]}
    this.apolloCheck(this.limit, this.offset)
  }

  OnClickPrev() {
    let temp: number = 0;
    if (this.offset == 10){
      this.offset = 0;
    this.limit = 10;
    console.log(this.offset)
    console.log(this.limit)
    this.apolloCheck(this.limit, this.offset)
    }
    else {
      temp = this.offset;
      this.offset = this.limit - this.offset;
      this.limit = temp;
      console.log(this.offset)
      console.log(this.limit)
      this.apolloCheck(this.limit, this.offset)
    }
  }

  IsDisabledPrev() {
    return this.offset == 0;
  }

  OnClickNext() {
    this.offset = this.limit;
    this.limit = this.limit+10;
    console.log(this.offset)
    console.log(this.limit)
    this.apolloCheck(this.limit, this.offset)
  }

}
