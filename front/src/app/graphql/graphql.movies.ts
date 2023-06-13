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


export {MOVIES};
export {CATFILTER};
