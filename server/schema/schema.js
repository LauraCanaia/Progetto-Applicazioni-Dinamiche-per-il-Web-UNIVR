const {movies} = require ('../sampleData.js'); //remove

const pool = require('../config/db')
const queries = require('../src/movie/queries')


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLEnumType,
  } = require('graphql');



const MovieType = new GraphQLObjectType({
  name: 'Movie',
  description: 'movie tyoe',
  fields: () => ({
      film_id: { type: GraphQLID },
      title: { type: GraphQLString },
      description: { type: GraphQLString },
      release_year: { type: GraphQLString },
      language_id: { type: GraphQLString },
      rental_duration: { type: GraphQLString },
      rental_rate: { type: GraphQLString },
      length: { type: GraphQLInt },
      replacement_cost: { type: GraphQLString },
      rating: { type: GraphQLString },
      last_update: { type: GraphQLString },
      special_features: { type: GraphQLList(GraphQLString) },
      fulltext: { type: GraphQLString }
  }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'this is a root query',
    fields: {
        movies: {
          type: new GraphQLList(MovieType),
          description: 'get all movies',
          resolve(parent, args) {
            
            // let test = pool.query(queries.getMovies, (error,results) =>{
              
            //   if (error) throw error;
            //   var result = results.rows;
            //   console.log(result)
            //   // console.log(typeof result);
            //   result
            // })

            console.log(typeof movies);
            return movies;
          },
        },
        movie: {
          type: MovieType,
          description: 'get movie by id',
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
            let result = movies.find(movie => movie.film_id === args.id);
            console.log(result);
            console.log(typeof result);
            return result
              // pool.query(queries.getMovieInfoById, [args.id], (error,results) =>{
              //     if (error) throw error;
              //     let result = results.rows
              //     console.log(result)
              //     return result
              // })
            
          },
        },
    },
  });


  module.exports = new GraphQLSchema ({
    query: RootQuery
  })
  