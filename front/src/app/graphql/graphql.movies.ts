import {gql} from 'apollo-angular';

const MOVIES = gql`query{
  movies{
    title,
    description,
    release_year
  }
}`
;

export {MOVIES};
