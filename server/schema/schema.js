const query = require('../config/db')
// import * as from '../db.js'
const queries = require('../src/queries')
const {
  CategoryType,
  MovieType,
  RentalType
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
                            description: 'list of id of wanted categories',},
            only_available: { type: GraphQLBoolean}
          },
          resolve: async (parent, args) => {
            let result = ""
            if (args.film_title != null){
              const param = '%' + args.film_title + '%';
              console.log(param)
              result = await query(queries.getMovieByTitle, [param])
            }
            else if (args.only_available != null){
              if (args.only_available == true){
                result = await query(queries.getAvailableMovies)
              }else{
                result = await query(queries.getMovies)
              }
              
            }
            else if (args.film_category != null){
              console.log(args.film_category)

              result = await query(queries.getMoviesInCategory,[ args.film_category ])
              
              console.log(result.rows);
              return result.rows
            }

            
            // console.log(result.rows)
            return result.rows
          }          
        },

        movie: {
          type: MovieType,
          description: 'get movie by id',
          args: { 
            film_id: { type: GraphQLID },
            film_title: { type: GraphQLString },
         },
          resolve: async (parent, args) => {
            let result = ""
            console.log(args)
            console.log(args.film_id)
            console.log(args.film_title)
            if (args.film_id != null){
              console.log("args.film_id != emptystring")
              result = await query(queries.getMovieInfoById, [args.film_id])
            }
            else if (args.film_title != null){
              console.log("args.film_title != emptystring")
              const param = '%' + args.film_title + '%';
              console.log(param)
              result = await query(queries.getMovieByTitle, [param])
            }

            //TODO IF ID AND TITLE != EMPTY STRING
            return result.rows[0]
          }
        },
        categories: {
          type: new GraphQLList(CategoryType),
          description: 'get all categories',
          resolve: async () => {
            const result = await query("select * from category c group by category_id")
            // console.log(result.rows)
            return result.rows
          }          
        },
        pecunia_pagata:{
          type: MovieType,
          description: 'get movie by id',
          args: { 
            costumer_id: { type: GraphQLID }
         },
        }
    },
  });


  module.exports = new GraphQLSchema ({
    query: RootQuery
  })
  