import {gql} from 'apollo-angular';

const MOVIES = gql`query($film_title : String!){
  movies(film_title : $film_title){
    title,
    description,
    release_year,
    rating,
    rental_duration,
    length,
    category{
      name
    },
    actor{
      first_name,
      last_name
    },
    language{
      name
    },
    replacement_cost
  }
}`
;

const CATFILTER = gql`query($film_category : [ID]!){
  movies(film_category : $film_category){
    title,
    release_year,
    rating,
    category{
      name
    },
    language{
      name
    },
    replacement_cost
  }
}`
;

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

export {MOVIES};
export {CATFILTER};
export {RENTAL_HISTORY};
