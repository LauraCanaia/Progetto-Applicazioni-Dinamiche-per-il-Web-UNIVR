import { NgModule } from '@angular/core';
import { ApolloBoostModule, ApolloBoost } from 'apollo-angular-boost';
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  exports : [
    HttpClientModule,
    ApolloBoostModule,
  ]
})
export class GraphqlModule {
  constructor(
    apolloBoost : ApolloBoost
  ) {
    apolloBoost.create(
      {
        uri : 'http://localhost:4000/graphql'
      }
    )
  }
}
