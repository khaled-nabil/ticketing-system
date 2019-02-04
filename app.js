const {ApolloServer, gql} = require('apollo-server');
const {makeExecutableSchema} = require('graphql-tools');
const mongoose = require ('mongoose');
const { userResolvers, userTypeDefs } = require('./models/users.schema');

mongoose.connect(
    "mongodb://localhost:27017/ticketing",
    { useNewUrlParser: true }
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
    typeDefs: [rootTypeDefs, userTypeDefs],
    resolvers: userResolvers,
});
const server = new ApolloServer({
    schema
});
server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
