import {gql} from "apollo-angular";

const BASKET = gql `query Basket {
  basket {
      film {
          title
          film_id
          rental_rate
          rental_duration
          store_availability {
              address {
                  address
                  district
                  postal_code
              }
              store_id
          }
      }
  }
}
`;



export {BASKET};
