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
          const result = await pool.query("select * from language where language_id = $1", [parent.language_id]);
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
          const result = await pool.query("select * from actor a join film_actor fa on a.actor_id = fa.actor_id where fa.film_id = $1", [parent.film_id]);
          return result.rows
        }
      },
      category: { 
        type: new GraphQLList(CategoryType), 
        resolve: async (parent, args) => {
          const result = await pool.query("select * from category c join film_category fc on c.category_id  = fc.category_id where fc.film_id = $1", [parent.film_id]);
          return result.rows
        }
      },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'this is a root query',
    fields: {
        movies: {
          type: new GraphQLList(MovieType),
          description: 'get list of all movies',
          resolve: async () => {
            const result = await pool.query(queries.getMovies)
            // console.log(result.rows)
            return result.rows
          }          
        },
        available_movies: {
          type: new GraphQLList(MovieType),
          description: 'get all list of available movies',
          resolve: async () => {
            const result = await pool.query(queries.getAvailableMovies)
            // console.log(result.rows)
            return result.rows
          }          
        },
        movies_by_title: {
          type: new GraphQLList(MovieType),
          description: 'get list of all movies with a title that matches',
          args: { title: { type: GraphQLID } },
          resolve: async (parent, args) => {
            const param = '%' + args.title + '%';
            const result = await pool.query(queries.getMovieByTitle, [param])
            // console.log(result.rows)
            return result.rows
          }          
        },
        movie: {
          type: MovieType,
          description: 'get movie by id',
          args: { id: { type: GraphQLID } },
          resolve: async (parent, args) => {
            const result = await pool.query(queries.getMovieInfoById, [args.id])
            // console.log(result.rows[0])
            return result.rows[0]
          }
        },
        categories: {
          type: new GraphQLList(CategoryType),
          description: 'get all categories',
          resolve: async () => {
            const result = await pool.query("select * from category c group by category_id")
            // console.log(result.rows)
            return result.rows
          }          
        },
    },
  });


  module.exports = new GraphQLSchema ({
    query: RootQuery
  })
  