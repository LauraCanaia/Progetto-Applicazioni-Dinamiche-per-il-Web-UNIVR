import {gql} from 'apollo-angular';

const MOVIES = gql`query{
  movies{
    title
  }
}`
;

export {MOVIES};
