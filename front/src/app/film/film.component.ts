import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck, OnDestroy,
  OnInit, Output
} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {CATFILTER, MOVIES} from '../graphql/graphql.movies';
import {CATEGORIES} from "../graphql/graphql.categories";
import {ActivatedRoute, Router} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';
import {MatChipSelectionChange} from "@angular/material/chips";

// @ts-ignore
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})

export class FilmComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
DoCheck, OnDestroy{

  reset = ""
  // @ts-ignore
  ismovie : boolean;
  // 3 things I need to talk with the graphql api
  movies : any[] = [];
  loading = true;
  error : any;

  categories : any[] = [];

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


  apolloCheckCat(categories : any){
    this.apollo
      .watchQuery({
        query : CATFILTER,
        variables : {
          film_category :  categories,
        },
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        }
      }).valueChanges.subscribe((result : any) => {
      this.movies = result?.data?.movies;
      console.log(this.movies)
      this.loading = result.loading;
      this.error = result.error;
    });

  }
  apolloCheck(title : string){
    this.apollo
      .watchQuery({
        query : MOVIES,
        variables : {
          film_title :  title,
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

  ngOnInit(): void {
    this.apolloCheck("")
    this.categoriesApollo();
  }

  ngAfterContentChecked(): void {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {
  }

  ngDoCheck(): void {
  }

  ngOnDestroy(): void {
  }

// Taking the string of the filter -> HTMLInputElement is a casting
  onInput(event : Event) {
    this.reset = (<HTMLInputElement>event.target).value
    this.apolloCheck("")
  }

  onClick(e : any, title : string) {
    this._router.navigateByUrl('films/filmForm/'.concat(title));
  }

  onSearch(name : any)
  {
    this.apolloCheck(name.target.value)
  }

  onSearchCat(category : any) {
    console.log(category.category_id)
    this.apolloCheckCat([category.category_id])
  }
}
