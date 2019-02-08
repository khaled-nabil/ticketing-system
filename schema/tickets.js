const Tickets = require( '../models/tickets');
const User = require( '../models/users');
const {ticketTypes, ticketStatus} = require("../constants/schmas");

const ticketsTypeDefs = `
  type Ticket {
    _id: ID!
    title: String!
    body: String!
    type: types!
    userId: String
    user: User,
    status: states!
  }
  input TicketInput {
    title: String
    body: String
    type: String
    userId: String
    status: String
  }
  input TicketFilterInput {
    limit: Int
  }
  enum types {
    ${ticketTypes.join("\n")}
  }
  enum states {
    ${ticketStatus.join("\n")}
  }
  extend type Query {
    Tickets(filter: TicketFilterInput): [Ticket]
    Ticket(id: String!): Ticket
  }
  extend type Mutation {
    addTicket(input: TicketInput!): Ticket
  }
`;

const ticketsResolvers = {
    Query: {
        async Tickets(_, { filter }) {
            const Tickets= await Tickets.find({}, null, filter);
            return Tickets.map(Ticket => Ticket.toGraph());
        },
        async Ticket(_, { id }) {
            const Ticket = await Tickets.findById(id);
            return Ticket.toGraph();
        },
    },
    Mutation: {
        async addTicket(_, { input }) {
            const Ticket = await Tickets.create(input);
            return Ticket.toGraph();
        },
    },
    Ticket: {
        async user(ticket) {
            if(ticket.userId) {
                const user = await User.findById(ticket.userId);
                return user.toGraph();
            }
            return null;
        }
    }
};
module.exports = {ticketsTypeDefs, ticketsResolvers};
