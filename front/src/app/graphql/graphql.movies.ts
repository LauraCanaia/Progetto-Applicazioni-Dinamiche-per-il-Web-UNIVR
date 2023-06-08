import {gql} from 'apollo-angular';

const MOVIES = gql`query($film_title : String!){
  movies(film_title : $film_title){
    title,
    description,
    release_year
  }
}`
;

export {MOVIES};
