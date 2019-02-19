import React from 'react';
import {Query} from "react-apollo";
import {getUsers, getToken} from "../constants/queries"

class Home extends React.Component {
     constructor(props) {
        super(props);
        this.checkToken().then(() => {
            //TODO: Update ApolloClient with Authorization in the header
            this.props.configureApollo();
            /*console.log("Updating Apollo",this.props.token)
            this.props.client.link = authLink(this.props.token).concat(httpLink);*/
        });
         this.checkToken = this.checkToken.bind(this);
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
        this.props.updateToken({token: data.login});
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
            console.info("Token found");
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
            console.warn("No Token");
            return "You must log in first";
        }
    }
}

export default Home;
