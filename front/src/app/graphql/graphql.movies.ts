import {gql} from 'apollo-angular';

const MOVIES = gql`query($film_title : String, $film_category : [ID]){
  movies(film_title : $film_title, film_category : $film_category){
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

// const CATFILTER = gql`query($film_category : [ID]!){
//   movies(film_category : $film_category){
//     title,
//     release_year,
//     rating,
//     category{
//       name
//     },
//     language{
//       name
//     },
//     replacement_cost
//   }
// }`
// ;


export {MOVIES};
// export {CATFILTER};
