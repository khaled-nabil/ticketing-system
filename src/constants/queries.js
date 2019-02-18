import gql from 'graphql-tag';

const getUsers =gql`
        {
          users(filter: {limit: 10}) {
            _id
            firstName
            lastName
            email
          }
        }
    `;
const getToken =gql`
        query Login($email: String!, $password: String!) {
          login(filter: {email:$email,password:$password})
        }
    `;
export {getUsers, getToken};
