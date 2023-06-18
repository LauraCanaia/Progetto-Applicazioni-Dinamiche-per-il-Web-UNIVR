import {gql} from 'apollo-angular';

const RENTAL_HISTORY = gql`query Pecunia_pagata {
  pecunia_pagata {
      payment {
          payment_id
          staff_id
          amount
          payment_date
      }
      rental_date
      return_date
      inventory {
          film {
              film_id
              title
          }
          inventory_id
      }
      rental_id
  }
}
`
;

export {RENTAL_HISTORY};
