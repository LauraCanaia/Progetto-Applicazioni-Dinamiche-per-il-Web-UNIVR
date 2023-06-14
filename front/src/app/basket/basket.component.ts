import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {query} from "@angular/animations";
import {Router} from "@angular/router";
import { HttpHeaders } from '@angular/common/http';
import {BASKET} from "../graphql/graphql.basket";
import {REMOVEFROMBASKET} from "../graphql/graphql.mutations";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  token = sessionStorage.getItem('token') || "";

  basket: any[] = [];
  loading: any;
  error: any;
minDate: Date= new Date();
maxDate: Date = new Date();

  apolloBasket(){
    this.apollo
      .watchQuery({
        query : BASKET,
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        },

      }).valueChanges.subscribe((result : any) => {
        this.basket = result?.data?.basket?.film;
        this.loading = result.loading;
        this.error = result.error;

    });
  }

  apolloRemoveFromBasket(film_id?: number){
    this.apollo
      .mutate({
        mutation : REMOVEFROMBASKET,
        variables : {
          film_id :  film_id
        },
        context: {
          headers: new HttpHeaders().set("authorization", this.token),
        },
        refetchQueries: [BASKET],
      }).subscribe((result : any) => {
        console.log(result)
        console.log(result?.data)


    });
  }

  constructor(private apollo : Apollo, private router : Router){
  }

  ngOnInit(): void {
    this.apolloBasket()
    this.maxDate.setDate(this.maxDate.getDate() + 2);

  }

  onClickRent($event: MouseEvent) {
    throw new Error('Method not implemented.');
  }

  onSelectStore(selected: boolean, store_id: number,film_id: number) {
    throw new Error('Method not implemented.');
  }

  onClickDelete($event: MouseEvent, film_id: number) {
    this.apolloRemoveFromBasket(film_id)
  }




}
