import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {getUsers} from "../constants/queries"

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <Query query={getUsers}>
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
        )
    }
}
export default Home;
