const query = require('../config/db')
// import * as from '../db.js'
const queries = require('../src/queries')
const {
  CategoryType,
  MovieType,
  PaymentType
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


const RootQuery = new GraphQLObjectType({
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
          description: 'TODO',
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


  module.exports = new GraphQLSchema ({
    query: RootQuery
  })
  