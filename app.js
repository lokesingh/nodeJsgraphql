const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require("./middleware/is-auth");

const app = express();

app.use(bodyParser.json());
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose.connect('mongodb://POS:12345@ds127443.mlab.com:27443/pos')
  .then(()=>{
    app.listen(8000);
  })
  .catch(err=>{
    console.log(err)
  })
