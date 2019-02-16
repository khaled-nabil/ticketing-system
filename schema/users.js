const User = require( '../models/users');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../constants/authentication');

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
    self: User
    login(filter: LoginInput): String
  }
  input UserInput {
    email: String
    password: String
    firstName: String
    lastName: String
  }
  input LoginInput {
    email: String!
    password: String!
  }
  extend type Mutation {
    addUser(input: UserInput!): User
    editUser(id: String!, input: UserInput!): User
    deleteUser(id: String!): User
  }
`;

const userResolvers = {
    Query: {
        users: async (_, { filter = {} }, context) => {
            if(!context.user) return null;
            let users = await User.find({}, null, filter);
            return users.map(user => user.toGraph());
        },
        user: async (_, { id }, context) => {
            if(!context.user) return null;
            let user = await User.findById(id);
            return user.toGraph();
        },
        self: async (root, args, context) => {
            if(!context.user) return null;
            let user = await User.findOne({_id: context.user});
            return user.toGraph();
        },
        login: async (_, {filter:{email, password} }) => {
            let user = await User.findOne({email: email, password: password});
            if(user) {
                return jwt.sign({id: user._id}, SECRET, { expiresIn: '1h' });
            }
            return null;
        },
    },
    Mutation: {
        addUser: async (_, { input }) => {
            let user =  await User.create(input);
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
