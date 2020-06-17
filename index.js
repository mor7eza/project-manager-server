const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { PORT, MONGODB_URI } = require("./config");

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

try {
  server
    .listen({ port: PORT })
    .then(({ url }) => {
      console.log(`Server is running on ${url}`);
      return mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });
    })
    .then(() => console.log("Database connected!"));
} catch (error) {
  throw new Error(error);
}
