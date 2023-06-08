import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck, OnDestroy,
  OnInit
} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {MOVIES} from '../graphql/graphql.movies';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css'],
})

export class FilmComponent implements OnInit, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit,
DoCheck, OnDestroy{

  reset = ""

  // 3 things I need to talk with the graphql api
  movies : any[] = [];
  loading = true;
  error : any;

  constructor(private apollo : Apollo) {
  }

  apolloCheck(title : string){
    this.apollo
      .watchQuery({
        query : MOVIES,
        variables : {
          film_title :  title,
        }
      }).valueChanges.subscribe((result : any) => {
      this.movies = result?.data?.movies;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

  ngOnInit(): void {

    this.apolloCheck("")

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

  onClick(e : any) {
    console.log(e)
  }

  onSearch(name : any)
  {
    this.apolloCheck(name.target.value)
  }
}
