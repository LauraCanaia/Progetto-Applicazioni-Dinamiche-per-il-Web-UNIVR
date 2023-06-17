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
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  getDuration(milli: any){
    let minutes = Math.floor(milli / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);
    return days
  };

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

      let temp = result?.data?.pecunia_pagata

      for (let i = 0; i < result?.data?.pecunia_pagata.length; i++) {
        this.history[i] = {
          amount: temp[i].amount,
          payment_date: temp[i].payment_date,
          rental_date: temp[i].rental.rental_date,
          return_date: temp[i].rental.return_date,
          title: temp[i].rental.inventory.film.title
        }
        // this.dataSource = new MatTableDataSource<PAYMENT>(history);
        // console.log(this.history[i])
        // console.log(this.history[i].amount)
        // this.totalExpense+=this.history[i].amount
        // console.log(this.totalExpense)

        // this.getFillSelectedBook(this.basket[i])
      }
      // console.log (this.history)
      this.dataSource = new MatTableDataSource<PAYMENT>(this.history);
      this.dataSource.sort = this.sort;
    });

  }

  ngOnInit(): void {
    this.apolloCheck()
  }

  // ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
  // }





}


export interface DATATYPE {
  pecuniapagata:PAYMENT
}

export interface PAYMENT {
  amount: number;
  payment_date: string;
  rental_date: string;
  return_date:string;
  title:string;

}

// const history : PAYMENT[] = [
//   {
//     amount: 1,
//     payment_date: "test",
//     rental_date: "test",
//     return_date:"test",
//     title:"test"

//   },
//   {
//     amount: 2,
//     payment_date: "test",
//     rental_date: "test",
//     return_date:"test",
//     title:"test"

//   }
// ];

// export interface RENTAL {
//   rental_date:string
//   inventory:INVENTORY
//   return_date:string
// }

// export interface INVENTORY {

//   movie:MOVIE
// }


// export interface MOVIE {
//   title:string
// }


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
