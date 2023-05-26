const express = require("express");
require('dotenv').config();
const port = process.env.PORT || 4000;
const {graphqlHTTP}  = require('express-graphql');

const logger = require('morgan');
const schema = require('./schema/schema')


var app = express()
app.use(logger('dev'))

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
)
app.listen(port, () => console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`))


