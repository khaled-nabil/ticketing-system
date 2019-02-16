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
export {getUsers};
