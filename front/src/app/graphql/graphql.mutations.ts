import {gql} from 'apollo-angular';



const LOGIN = gql`mutation Login($email : String!, $password : String!){
  login(email : $email, password : $password)
}`;


const REMOVEFROMBASKET = gql`mutation RemoveFromBasket($film_id : ID) {
  removeFromBasket(film_id: $film_id)
}`;


export {LOGIN, REMOVEFROMBASKET};
