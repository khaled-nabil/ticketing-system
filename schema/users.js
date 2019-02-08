const User = require( '../models/users');

const userTypeDefs = `
  type User {
    _id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String
  }
  input UserFilterInput {
    limit: Int
  }
  extend type Query {
    users(filter: UserFilterInput): [User]
    user(id: String!): User
  }
  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String
  }
  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
  }
`;

const userResolvers = {
    Query: {
        users: async (_, { filter = {} }) => {
            let users = await User.find({}, null, filter);
            return users.map(user => user.toGraph());
        },
        user: async (_, { id }) => {
            let user = await User.findById(id);
            return user.toGraph();
        },
    },
    Mutation: {
        addUser: async (_, { input }) => {
            let user =  await User.create(input);
            console.log("Schema",user);
            console.log("SchemaGraph",user.toGraph());
            return user.toGraph();
        },
        editUser: async (_, { id, input }) => {
            let user = await User.findByIdAndUpdate(id, input);
            return user.toGraph();
        },
        deleteUser: async (_, { id }) => {
            let user = await User.findByIdAndRemove(id);
            return user ? user.toGraph() : null;
        },
    },
};
module.exports = {userTypeDefs, userResolvers}
