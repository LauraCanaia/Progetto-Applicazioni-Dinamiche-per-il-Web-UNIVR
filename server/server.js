require('dotenv').config();

const express = require("express");
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 4000;
const {graphqlHTTP}  = require('express-graphql');
const cors = require('cors')

const logger = require('morgan');
const schema = require('./schema/schema')

const SECRET = 'ASDFfgasg251fdaFEEEFDR5315asrwhaqr'//CAMBIALO, CERCA ONLINE COME CRARE UN SECRET

const app = express()
app.use(logger('dev'))


const checkUser = async (req, res) => {
  const token = req.headers["authorization"] || ""
  console.log(token)
  // const result = await query_credentials(`select * from public."user" u where user_id = $1`, [1])
  // console.log(result.rows)
  try{
    const {user} = await jwt.verify(token, SECRET);
    console.log(user)
    req.user = user
  }catch(err){
    console.log(err)
  }
  req.next();
};

app.use(checkUser);

app.use("/graphql", cors() ,graphqlHTTP(req => ({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
    context: {
      SECRET,
      user:req.user
    }
  }))
)
app.listen(port, () => console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`))


