import React from 'react';
import {Query} from "react-apollo";
import {getToken} from "../constants/queries"
import Login from "./login"
import Home from "./home"

class Root extends React.Component {
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
                <Home />
            )
        } else {
            return <Login />;
        }
    }
}

export default Root;
