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

  // 3 things I need to talk with the graphql api
  movies : any[] = [];
  loading = true;
  error : any;

  //button if a user isn't logged
  isDisabled : boolean = false

  constructor(private apollo : Apollo) {
  }

  ngOnInit(): void {

    this.apollo
      .watchQuery({
        query : MOVIES,
      }).valueChanges.subscribe((result : any) => {
        this.movies = result?.data?.movies;
        this.loading = result.loading;
        this.error = result.error;
    });

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


}
