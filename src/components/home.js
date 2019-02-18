import React from 'react';
import {Query} from "react-apollo";
import ApolloClient from "apollo-boost";
import {getUsers, getToken} from "../constants/queries"
import {URI} from "../constants/connection";

class Home extends React.Component {
     constructor(props) {
        super(props);
        this.checkToken().then(() => {
            //TODO: Update ApolloClient with Authorization in the header
            /*this.props.client = new ApolloClient({
                uri: URI,
                headers: {authorization: this.props.token}
            });*/
        });
    }

    componentDidUpdate() {
        console.log("did update",this.props);
    }

    async checkToken() {
        if (this.props.token)
            return this.props.token;
        else {
            return await this.fetchToken("helgvlo@gmail.com", "132");
        }
    }

    async fetchToken(email, password) {
        const data = await this.tokenizer({email, password});
        this.props.updateToken({token: data});
    }

    tokenizer({email, password}) {
        return this.props.client.query({
            query: getToken,
            variables: {email: email, password: password}
        }).then(response => {
            return response.data
        }).catch(error => {
            console.warn(error);
            return {}
        });
    }

    render() {
        if (this.props.token) {
            console.log("Token found");
            return (
                <Query query={getUsers}>
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>Error :(</p>;
                        return data.users.map(({_id, firstName, lastName, email}) => (
                            <div key={_id}>
                                <p>{`${firstName} ${lastName} by ${email}`}</p>
                            </div>
                        ));
                    }}
                </Query>
            )
        } else {
            console.log("No Toeken");
            return "You must log in first";
        }
    }
}

export default Home;
