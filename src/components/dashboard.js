import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
const Home = () => (
    <Query
        query={gql`
        {
          users(filter: {limit: 10}) {
            _id
            firstName
            lastName
            email
          }
        }
    `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            return data.users.map(({ _id, firstName, lastName, email}) => (
                <div key={_id}>
                    <p>{`${firstName} ${lastName} by ${email}`}</p>
                </div>
            ));
        }}
    </Query>
);
export default Home;
