const bcrypt = require('bcrypt')
const query = require('../config/db')
// import * as from '../db.js'
const queries = require('../src/queries')
const {
  CategoryType,
  MovieType,
  PaymentType,
  UserType
}  = require('../src/types');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require('graphql');


const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'this is a root query',
    fields: {
        movies: {
          type: new GraphQLList(MovieType),
          description: 'get list of all movies',
          args: { 
            film_title: { type: GraphQLString },
            film_category: { type : new GraphQLList(GraphQLID),
                            description: 'list of id of wanted categories'},
            only_available: { type: GraphQLBoolean,
                            description: 'return only available movies'}
          },
          resolve: async (parent, args) => {
            let conditionNumber = 0
            let newQuery = queries.getMovies
            let paramsList = []

            if (args.film_title != null){
              if (conditionNumber == 0){
                newQuery += " WHERE " 
              }else{
                newQuery += " AND "
              }
              conditionNumber++
              newQuery += queries.moviesByTitleCondition.replace("$1", "$"+conditionNumber); 
              paramsList.push('%' + args.film_title + '%');
            }

            if (args.film_category != null){
              if (conditionNumber == 0){
                newQuery += " WHERE "
              }else{
                newQuery += " AND "
              }
              conditionNumber++
              newQuery += queries.moviesByCategoryCondition.replace("$1", "$"+conditionNumber); 
              paramsList.push(args.film_category);
            }

            if (args.only_available != null && args.only_available==true){
              if (conditionNumber == 0){
                newQuery += " WHERE "
              }else{
                newQuery += " AND "
              }
              conditionNumber++
              newQuery += queries.moviesAvailabilityCondition; 
            }

            console.log(newQuery)
            const result = await query(newQuery, paramsList)
            console.log(result.rows)
            return result.rows
            
          }          
        },

        movie: {
          type: MovieType,
          description: 'get movie by id',
          args: { 
            film_id: { type: GraphQLID },
         },
          resolve: async (parent, args) => {
            let result = ""
            if (args.film_id != null){
              result = await query(queries.getMovieInfoById, [args.film_id])
            }
            return result.rows[0]
          }
        },


        categories: {
          type: new GraphQLList(CategoryType),
          description: 'get all categories',
          resolve: async () => {
            const result = await query("select * from category c group by category_id")
            return result.rows
          }          
        },


        pecunia_pagata:{
          type: new GraphQLList(PaymentType),
          description: 'list of payment',
          args: { 
            costumer_id: { type: GraphQLID }
         },
         resolve: async (parent, args) => {
          const result = await query("select * from payment p where customer_id = $1", [args.costumer_id])
          return result.rows
        }  
      }
  },
});

let userData = [] 

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  description: 'this is a root mutation',
  fields: {
    login:{
      type: GraphQLString,
      description: 'testiamo il login',
      args: { 
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args, {SECRET}) => {
        const dati = userData.find(data => data.username === args.username)
        console.log(dati.password)
        const valid = await bcrypt.compare(args.password, dati.password)

        // const result = await query("")
        return valid
      }   
    },
    
    register:{
      type: GraphQLString,
      description: 'testiamo il register',
      args: { 
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        customer_id: { type: GraphQLID }
      },
      resolve: async (parent, args, ) => {
        // const result = await query("")
        let password = await bcrypt.hash(args.password, 10)
        userData.push({'username': args.username, 'password':password, 'unhashedpassword': args.password})
        console.log(userData)
        return "test register"
      }   
    }
  }
})


module.exports = new GraphQLSchema ({
  query: RootQueryType,
  mutation: RootMutationType
})
