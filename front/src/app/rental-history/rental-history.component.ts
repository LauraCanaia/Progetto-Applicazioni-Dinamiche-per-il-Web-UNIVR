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
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PAYMENT, getDuration, toISODate} from '../utils';


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

  @ViewChild(MatSort) sort!: MatSort;

  tableHistory : PAYMENT[] = []

  dataSource = new MatTableDataSource<PAYMENT>(this.tableHistory);
   columnsToDisplay = ['title', 'payment_date', 'amount', "duration", "action"];

  expandedElement!: PAYMENT | null;

  paymentHistory : any[] = []

  totalExpense:number=0

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

      this.paymentHistory = result?.data?.pecunia_pagata
      console.log(this.paymentHistory)

      for (let i = 0; i < result?.data?.pecunia_pagata.length; i++) {
        this.tableHistory[i] = {
          id : i,
          amount: this.paymentHistory[i].amount + " $",
          payment_date: toISODate(this.paymentHistory[i].payment_date),
          duration: getDuration(this.paymentHistory[i].rental.return_date - this.paymentHistory[i].rental.rental_date),
          title: this.paymentHistory[i].rental.inventory.film.title
        }
      }

      var sum = this.paymentHistory.reduce((accum:Number,item:PAYMENT) => (Number(accum) + Number(item.amount)), 0)
      this.totalExpense = sum.toFixed(2);

      this.dataSource = new MatTableDataSource<PAYMENT>(this.tableHistory);
      this.dataSource.sort = this.sort;
    });

  }

  ngOnInit(): void {
    this.apolloCheck()
  }

  toDate(arg: any) {
    return toISODate(arg)
    }


}

