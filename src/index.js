const express = require('express');
const { gql, ApolloServer } = require('apollo-server-express');

require('dotenv').config();

const typeDefs=require('./schema');
const resolvers=require('./resolvers')

const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();
db.connect(DB_HOST);

const server = new ApolloServer({ typeDefs, resolvers,context:()=>{
  return {models}
} });

server.applyMiddleware({ app, path: '/api' });

app.listen(port, () => console.log('Listening on port 4000'));
