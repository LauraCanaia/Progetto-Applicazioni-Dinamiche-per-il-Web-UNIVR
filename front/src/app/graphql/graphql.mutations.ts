import {gql} from 'apollo-angular';



const LOGIN = gql`mutation Login($email : String!, $password : String!){
  login(email : $email, password : $password)
}`;


export {LOGIN};
