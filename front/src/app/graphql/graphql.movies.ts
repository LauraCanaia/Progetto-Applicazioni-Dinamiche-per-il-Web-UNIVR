import {gql} from 'apollo-angular';

const MOVIES = gql`query($film_title : String!){
  movies(film_title : $film_title){
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


export {MOVIES};
export {MOVIE};
