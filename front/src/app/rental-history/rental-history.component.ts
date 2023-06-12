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
import {RENTAL_HISTORY} from '../graphql/graphql.movies';
import {util} from "protobufjs";
import EventEmitter = util.EventEmitter;
import {ActivatedRoute, Router} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css']
})
export class RentalHistoryComponent implements OnInit{
  toDate(timemillis: string) {
    let date = new Date(timemillis);
    let dateString = date.toString();
    console.log(dateString)
    return date

  }

  ishistory = false


  reset = ""
  // @ts-ignore
  // 3 things I need to talk with the graphql api
  history : any[] = [];
  loading = true;
  error : any;

  token = sessionStorage.getItem('token') || "";

  constructor(private apollo : Apollo, private route : ActivatedRoute, private _router : Router) {
  }

  apolloCheck(){
    this.apollo
      .watchQuery({
        query : RENTAL_HISTORY,
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        }
      }).valueChanges.subscribe((result : any) => {
      this.history = result?.data?.pecunia_pagata;
      console.log("uno " + this.history)
      console.log("due " + this.history[0])
      console.log("due " + this.history[0].rental.inventory.film.title)

      this.loading = result.loading;
      this.error = result.error;
    });

  }

  ngOnInit(): void {
    this.apolloCheck()
  }






}
