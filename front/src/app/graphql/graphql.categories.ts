import {gql} from "apollo-angular";

const CATEGORIES = gql `query{
  categories{
    name
  }
}`;

export {CATEGORIES};
