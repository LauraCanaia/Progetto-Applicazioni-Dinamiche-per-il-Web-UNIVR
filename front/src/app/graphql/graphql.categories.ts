import {gql} from "apollo-angular";

const CATEGORIES = gql `query{
  categories{
    category_id,
    name
  }
}`;

export {CATEGORIES};
