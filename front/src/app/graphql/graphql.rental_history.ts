import {gql} from 'apollo-angular';

const RENTAL_HISTORY = gql`query{
  pecunia_pagata{
    rental{
      rental_date,
      inventory{
        film{
          title
        }
      }
      return_date
    },
    amount,
    payment_date
  }
}`
;

export {RENTAL_HISTORY};
