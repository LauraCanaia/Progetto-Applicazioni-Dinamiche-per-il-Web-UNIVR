import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck, OnDestroy,
  OnInit, Output, ViewChild
} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {RENTAL_HISTORY} from '../graphql/graphql.rental_history';
import {util} from "protobufjs";
import EventEmitter = util.EventEmitter;
import {ActivatedRoute, Router} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {DataSource} from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';





@Component({
  selector: 'app-rental-history',
  templateUrl: './rental-history.component.html',
  styleUrls: ['./rental-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RentalHistoryComponent implements OnInit{



  toDate(timemillis: string) {
    var date = parseInt(timemillis);
    var d = new Date(date);
    var ds = d.toLocaleString();
    return ds
}
  @ViewChild(MatSort) sort!: MatSort;

  history : PAYMENT[] = []
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<PAYMENT>(this.history);
  columnsToDisplay = ['amount', 'payment_date', 'rental_date', 'return_date','title'];

  expandedElement!: PAYMENT | null;


  getDuration(milli: any){
    let minutes = Math.floor(milli / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);
    return days
  };

  totalExpense:string = ""

  ishistory = false

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
        console.log(result)

      this.loading = result.loading;
      this.error = result.error;

      let temp = result?.data?.pecunia_pagata

      for (let i = 0; i < result?.data?.pecunia_pagata.length; i++) {
        this.history[i] = {
          amount: temp[i].amount,
          payment_date: temp[i].payment_date,
          rental_date: temp[i].rental.rental_date,
          return_date: temp[i].rental.return_date,
          title: temp[i].rental.inventory.film.title
        }
      }

      var sum = this.history.reduce((accum:Number,item:PAYMENT) => (Number(accum) + Number(item.amount)), 0)
      this.totalExpense = sum.toFixed(2);

      this.dataSource = new MatTableDataSource<PAYMENT>(this.history);
      this.dataSource.sort = this.sort;
    });

  }

  ngOnInit(): void {
    this.apolloCheck()
  }

}


export interface DATATYPE {
  pecuniapagata:PAYMENT
}

export interface PAYMENT {
  amount: Number;
  payment_date: string;
  rental_date: string;
  return_date:string;
  title:string;
}
