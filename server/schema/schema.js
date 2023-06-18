const bcrypt = require('bcrypt')
const query = require('../config/db')
const query_credentials = require('../config/db_credentials')
const jwt = require('jsonwebtoken')
const queries = require('../src/queries')
const _ = require('lodash')
const {RentInputType} = require('../src/inputTypes')

const {
  CategoryType,
  MovieType,
  PaymentType,
  UserType,
  BasketType,
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
    GraphQLError,
    GraphQLInputObjectType
  } = require('graphql');

  //   const PersonInputType = new GraphQLInputObjectType({
  //   name: 'PersonInput',
  //   fields: {
  //     id: { type: new GraphQLNonNull(GraphQLID) },
  //   }
  // });


const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'this is a root query',
    fields: {
        movies: {
          type: new GraphQLList(MovieType),
          description: 'get list of all movies',
          args: { 
            film_title: { type: GraphQLString,
              description: 'list of movies that matches argument'},
            film_category: { type : new GraphQLList(GraphQLID),
                            description: 'list of id of wanted categories'},
            only_available: { type: GraphQLBoolean,
                            description: 'return only available movies'},
            limit: { type: GraphQLInt,
                              description: 'how many movie to return'},
            offset: { type: GraphQLInt,
                                description: 'how much offset from the first element in list'}
          },
          resolve: async (parent, args, {user}) => {
            if (user){
              let conditionNumber = 0
              let newQuery = queries.getMovies
              let paramsList = []

              if (args.film_title != null && args.film_title!=""){
                if (conditionNumber == 0){
                  newQuery += " WHERE " 
                }else{
                  newQuery += " AND "
                }
                conditionNumber++
                newQuery += queries.moviesByTitleCondition.replace("$1", "$"+conditionNumber); 
                paramsList.push('%' + args.film_title + '%');
              }

              if (args.film_category != undefined && args.film_category.length != 0){
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
                newQuery += queries.moviesAvailabilityCondition; 

              }
              if (args.limit != null && args.limit != undefined){
                conditionNumber++
                newQuery += " LIMIT $1".replace("$1", "$"+conditionNumber);
                paramsList.push(args.limit);
              }

              if (args.offset != null && args.offset != undefined){
                conditionNumber++
                newQuery += " OFFSET $1".replace("$1", "$"+conditionNumber);
                paramsList.push(args.offset);
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
          type: new GraphQLList(RentalType),
          description: 'list of payment',
         resolve: async (parent, args, {user}) => {
          if (user){
            const result = await query(queries.getRentalByCustomerId, [user.customer_id])
          return result.rows
        }  
          return null
          }  
        },

        basket:{
          type: BasketType,
          description: 'list movie in basket',
          resolve: async (parent, args, {user}) => {
            if (user){
              const result = await query_credentials("SELECT customer_id, film_id FROM public.basket WHERE customer_id = $1", [user.customer_id])
              console.log (result.rows)
              const basket = {
                'customer_id': user.customer_id,
                'film_id': result.rows.map(a => a.film_id)               
              }

              return basket
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


    register:{
      type: GraphQLBoolean,
      description: 'testiamo il register',
      args: { 
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        customer_id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve: async (parent, args, ) => {
        let password = await bcrypt.hash(args.password, 10)
        try{
          await query_credentials(    `INSERT INTO public."user"
            (email, "password", customer_id)
            VALUES($1, $2, $3);`, [args.email, password, args.customer_id])
        }catch(e){
          return false
        }
        console.log(password)
        return true
      }   
    },

    addToBasket:{
      type: GraphQLBoolean,
      description: 'add movie to basket of a customer',
      args: { 
        film_id: { type: new GraphQLNonNull(GraphQLID),
        description: 'list of payment' },
        
      },
      resolve: async (parent, args, {user}) => {
        if (user){
          try{
            await query_credentials(`INSERT INTO public.basket (customer_id, film_id) VALUES($1, $2);`, [user.customer_id, args.film_id])
          }catch(e){
            return false
          }
          return true
        }  
        return null
      }
    },


    rentMovies:{
      type: GraphQLBoolean,
      description: 'add movie to basket of a customer',
      args: { 
        rentObj: { type: new GraphQLNonNull(new GraphQLList(RentInputType)) },
      },
      resolve: async (parent, args, {user}) => {
        if (user){

          console.log(args)
          try{
            const result = await query(`select inventory_id
            from rental
            where inventory_id in (select inventory_id 
            from inventory i 
            where film_id = $1) and inventory_id not in (
            select inventory_id
            from rental
            where return_date is null)
            group by inventory_id;`, [args.rentObj[0].film_id])
            console.log(result.rows)
            console.log(result.rows[0].inventory_id)

            let customer_id = user.customer_id;
            let rental_date = args.rentObj[0].rental_date.slice(0, 19).replace('T', ' ');
            let store_id = args.rentObj[0].store_id;
            let inventory_id = result.rows[0].inventory_id



            await query(`INSERT INTO public.rental
            (rental_date, inventory_id, customer_id, return_date, staff_id, last_update) VALUES($1, $2, $3, NULL, $4, now());`, 
            [rental_date, inventory_id, customer_id, 1]) //staff_id hardcoded to 1

            await query_credentials(`DELETE FROM public.basket WHERE customer_id=$1;`, [user.customer_id])
          }catch(e){
            console.log(e)
            return false
          }
          return true
        }  
        return null
      }
    },

    removeFromBasket:{
      type: GraphQLBoolean,
      description: 'remove movie from basket of a customer',
      args: { 
        film_id: { type: GraphQLID,
        description: 'id of movie to remove, remove all otherwise'},
      },
      resolve: async (parent, args, {user}) => {

        if (user){
          if (args.film_id){

            console.log(args)
            console.log(user.customer_id)
            console.log(args.film_id)

            try{
              await query_credentials(`DELETE FROM public.basket WHERE customer_id=$1 AND film_id=$2;`, [user.customer_id, args.film_id])
              console.log("cancello " + user.customer_id, args.film_id)
            }catch(e){
              return false
            }
            return true
          }
          try{
            await query_credentials(`DELETE FROM public.basket WHERE customer_id=$1;`, [user.customer_id])
            console.log("cancello tutto" + user.customer_id, args.film_id)
          }catch(e){
            return false
          }
          return true
          
        }  
        return "null"
      }
    },


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
