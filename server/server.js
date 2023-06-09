const express = require("express");
require('dotenv').config();
const port = process.env.PORT || 4000;
const {graphqlHTTP}  = require('express-graphql');
var cors = require('cors')

const logger = require('morgan');
const schema = require('./schema/schema')

const SECRET = 'ASDFfgasg251fdaFEEEFDR5315asrwhaqr'//CAMBIALO, CERCA ONLINE COME CRARE UN SECRET

var app = express()
app.use(logger('dev'))

app.use("/graphql", cors() ,graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
    context: {
      SECRET
    }
  })
)
app.listen(port, () => console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`))


