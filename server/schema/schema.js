const bcrypt = require('bcrypt')
const query = require('../config/db')
const query_credentials = require('../config/db_credentials')
const jwt = require('jsonwebtoken')
const queries = require('../src/queries')
const _ = require('lodash')

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
    GraphQLError
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
          resolve: async (parent, args, {user}) => {
            if (user){
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
            const result = await query(newQuery, paramsList)
            return result.rows
            }
            return null
            
          }          
        },

        movie: {
          type: MovieType,
          description: 'get movie by id',
          args: { 
            film_id: { type: GraphQLID },
         },
          resolve: async (parent, args, {user}) => {
            if (user){
            let result = ""
            if (args.film_id != null){
              result = await query(queries.getMovieById, [args.film_id])
            }
            return result.rows[0]
          }
            return null
          }
        },


        categories: {
          type: new GraphQLList(CategoryType),
          description: 'get all categories',
          resolve: async ( parent, args, {user}) => {
            if (user){
            const result = await query("select * from category c group by category_id")
            return result.rows
          }          
            return null
          }          
        },


        pecunia_pagata:{
          type: new GraphQLList(PaymentType),
          description: 'list of payment',
         resolve: async (parent, args, {user}) => {
          if (user){
            const result = await query("select * from payment p where customer_id = $1", [user.customer_id])
          return result.rows
        }  
          return null

        }  
        }
    },
  });



const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  description: 'this is a root mutation',
  fields: {
    // register:{
    //   type: GraphQLString,
    //   description: 'testiamo il register',
    //   args: { 
    //     username: { type: new GraphQLNonNull(GraphQLString) },
    //     password: { type: new GraphQLNonNull(GraphQLString) },
    //     customer_id: { type: GraphQLID }
    //   },
    //   resolve: async (parent, args, ) => {
    //     let password = await bcrypt.hash(args.password, 10)
    //     console.log(password)
    //     return "test register"
    //   }   
    // },


    login:{
      type: GraphQLString,
      description: 'testiamo il login',
      args: { 
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, {email, password}, {SECRET}) => {
        
        const user = await query_credentials(`select * from public."user" u where email like $1`, [email]) ||  ""
        console.log(user)
        
        const valid = await bcrypt.compare(password, user.rows[0].password)
        if (!valid){  
          throw new Error('Incorret user or password');
        }
        const token = jwt.sign(
          {
            user: _.pick(user.rows[0], ['user_id', 'customer_id'])
          },
          SECRET,
          {
            expiresIn: '1y'
          }
        );
        return token
      }   
    },
  }
  })
  
module.exports = new GraphQLSchema ({
  query: RootQueryType,
  mutation: RootMutationType
})
