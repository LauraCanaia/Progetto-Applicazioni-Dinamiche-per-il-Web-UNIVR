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
import {PAYMENT, RENTAL, getDuration, toISODate} from '../utils';


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
   columnsToDisplay = ['title', 'rental_date', 'amount', "duration", "action"];

  expandedElement!: PAYMENT | null;

  rentalHistory : any[] = []
  // paymentHistory : any[] = []

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

      this.rentalHistory = result?.data?.pecunia_pagata

      for (let i = 0; i < this.rentalHistory.length; i++) {

        let payment = this.rentalHistory[i].payment
        let inventory = this.rentalHistory[i].inventory

        this.tableHistory[i] = {
          id : i,
          amount: (payment != null) ? payment?.amount + " $" : "-",
          payment_date:  (payment != null) ? toISODate(payment.payment_date) : "-",
          rental_date: toISODate(this.rentalHistory[i].rental_date),
          duration: (this.rentalHistory[i].return_date != null) ? getDuration(this.rentalHistory[i].return_date - this.rentalHistory[i].rental_date) : "Not yet returned",
          title: inventory.film.title
        }

      }

      var sum = this.rentalHistory.reduce((accum:Number,item:RENTAL) => (item.payment != null) ? Number(accum) +  Number(item.payment.amount) : Number(accum) + 0, 0)
      this.totalExpense = sum.toFixed(2);

      this.dataSource = new MatTableDataSource<any>(this.tableHistory);
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

