import {gql} from 'apollo-angular';

const MOVIES = gql`query {
  movie(id : 1){
    title
  }
}`
;

export {MOVIES};
