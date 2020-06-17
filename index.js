const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});
