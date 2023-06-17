import {gql} from 'apollo-angular';

const MOVIES = gql`query($film_title : String, $film_category : [ID]){
  movies(film_title : $film_title, film_category : $film_category){
    film_id,
    title,
    description,
    release_year,
    rating,
    rental_duration,
    rental_rate,
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
    }
  }
}`
;




export {MOVIES};
