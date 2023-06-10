import {gql} from 'apollo-angular';

const MOVIE =  gql`query($film_id : ID!){
  movie(film_id : $film_id){
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

export {MOVIE};
