import {gql} from 'apollo-angular';



const LOGIN = gql`mutation Login($email : String!, $password : String!){
  login(email : $email, password : $password)
}`;


const REMOVEFROMBASKET = gql`mutation RemoveFromBasket($film_id : ID) {
  removeFromBasket(film_id: $film_id)
}`;


const ADDTOBASKET = gql`mutation AddToBasket($film_id : ID!){
  addToBasket(film_id: $film_id)
}`;

const RENTMOVIES = gql`mutation RentMovies($rentInput : RentInput!) {
  rentMovies(rentInput: $rentInput)
}

const input RentInput {
  id: ID
}

const RentInputType = new GraphQLInputObjectType({
  name: 'RentInput',
  fields: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      store_id: { type: new GraphQLNonNull(GraphQLID) },
      rental_date: { type: new GraphQLNonNull(GraphQLString) },
}
});`;



export {LOGIN, REMOVEFROMBASKET, ADDTOBASKET, RENTMOVIES};
