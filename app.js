const {ApolloServer, gql} = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools');
const {merge} = require('lodash');
const mongoose = require('mongoose');
const {userResolvers, userTypeDefs} = require('./schema/users');
const {ticketsTypeDefs, ticketsResolvers} = require('./schema/tickets');

mongoose.connect(
    "mongodb://localhost:27017/ticketing",
    {
        useNewUrlParser: true,
        useCreateIndex: true,
    }
);
const rootTypeDefs = `
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`;
const schema = makeExecutableSchema({
    typeDefs: [rootTypeDefs, userTypeDefs, ticketsTypeDefs],
    resolvers: merge(userResolvers, ticketsResolvers)
});
const server = new ApolloServer({
    schema
});
server.listen().then(({url}) => {
    console.log(`Server at URL: ${url}`);
});
