import gql from 'graphql-tag';

const getUsers = gql`
        {
          Users(filter: {limit: 10}) {
            _id
            firstName
            lastName
            email
          }
        }
    `;
const getTickets = gql`
        {
          Tickets(filter: {limit: 10}) {
            _id
            title
            body
            type
            status
            userId
            user {
              firstName
              lastName
            }
          }
        }`;
const validateLogin = gql`
        {
            self {
                _id
            }
        }`;
const getToken = gql`
        query Login($email: String!, $password: String!) {
          login(filter: {email:$email,password:$password})
        }
    `;
export {getUsers, getToken, getTickets, validateLogin};
