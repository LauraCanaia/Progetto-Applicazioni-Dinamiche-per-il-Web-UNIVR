const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require('graphql');

const query = require('../config/db')


const ActorType = new GraphQLObjectType({
  name: 'Actor',
  description: 'actor type',
  fields: () => ({
      actor_id: { type: GraphQLID },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      last_update: { type: GraphQLString }
  }),
});

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'category type',
  fields: () => ({
      category_id: { type: GraphQLID },
      name: { type: GraphQLString },
      last_update: { type: GraphQLString }
  }),
});


const LanguageType = new GraphQLObjectType({
  name: 'Language',
  description: 'language type',
  fields: () => ({
      language_id: { type: GraphQLID },
      name: { type: GraphQLString },
      last_update: { type: GraphQLString }
  }),
});

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'movie type',
  fields: () => ({
      film_id: { type: GraphQLID },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      release_year: { type: GraphQLString },
      language: { 
        type: LanguageType,
        resolve: async (parent, args) => {
          const result = await query("select * from language where language_id = $1", [parent.language_id]);
          console.log(result.rows)
          return result.rows[0]
        }
      },
      rental_duration: { type: GraphQLString },
      rental_rate: { type: GraphQLString },
      length: { type: GraphQLInt },
      replacement_cost: { type: GraphQLString },
      rating: { type: GraphQLString },
      last_update: { type: GraphQLString },
      special_features: { type: GraphQLList(GraphQLString) },
      fulltext: { type: GraphQLString },
      actor: { 
        type: new GraphQLList(ActorType), 
        resolve: async (parent, args) => {
          const result = await query("select * from actor a join film_actor fa on a.actor_id = fa.actor_id where fa.film_id = $1", [parent.film_id]);
          return result.rows
        }
      },
      category: { 
        type: new GraphQLList(CategoryType), 
        resolve: async (parent, args) => {
          const result = await query("select * from category c join film_category fc on c.category_id  = fc.category_id where fc.film_id = $1", [parent.film_id]);
          return result.rows
        }
      },
  }),
});



const RentalType = new GraphQLObjectType({
  name: 'Rental',
  description: 'RentalType',
  fields: () => ({
      rental_id: { type: GraphQLID },
      rental_date: { type: GraphQLString },
      inventory_id: { type: GraphQLID },
      costumer_id: { type: GraphQLID },
      return_date: { type: GraphQLString },
      staff_id: { type: GraphQLID },
      last_update: { type: GraphQLString }
  }),
});

const PaymentType = new GraphQLObjectType({
  name: 'Payment',
  description: 'PaymentType',
  fields: () => ({
      payment_id: { type: GraphQLID },
      costumer_id: { type: GraphQLID },
      staff_id: { type: GraphQLID },
      rental_id: { type: GraphQLID },
      amount: { type: GraphQLString },
      payment_date: { type: GraphQLString }
  }),
});


const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  description: 'CustomerType',
  fields: () => ({
      costumer_id: { type: GraphQLID },
      store_id: { type: GraphQLID },
      first_name: { type: GraphQLString },
      last_name: { type: GraphQLString },
      email: { type: GraphQLString },
      adress_id: { type: GraphQLID },
      activebool: { type: GraphQLString },
      create_date: { type: GraphQLString },
      last_update: { type: GraphQLString },
      active: { type: GraphQLString },

  }),
});

const StoreType = new GraphQLObjectType({
  name: 'Store',
  description: 'StoreType',
  fields: () => ({
      store_id: { type: GraphQLID },
      manager_staff_id: { type: GraphQLID },
      aderess_id: { type: GraphQLID },
      last_update: { type: GraphQLString }
  }),
});



module.exports  = {
    ActorType,
    CategoryType,
    LanguageType, 
    MovieType
}