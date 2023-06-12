import {gql} from 'apollo-angular';

const MOVIES = gql`query($film_title : String!){
  movies(film_title : $film_title){
    title,
    description,
    release_year
  }
}`
;

const MOVIE = gql`query($film_title : String!){
  movies(film_title : $film_title){
    title,
    description,
    language{
      name
    },
    rental_duration,
    replacement_cost,
    category{
      name
    }
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
export {MOVIE};
export {RENTAL_HISTORY};
