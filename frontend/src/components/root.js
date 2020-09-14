import React, {Component, Fragment} from 'react';
import {getToken} from "../constants/queries"
import Login from "./login"
import Dashboard from "./dashboard"
import Tickets from "./tickets"
import Header from "./shared/header"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ApolloProvider} from "react-apollo";

class Root extends Component {
    constructor(props) {
        super(props);
        this.fetchToken = this.fetchToken.bind(this);
    }

    tokenizer({email, password}) {
        return this.props.client.query({
            query: getToken,
            variables: {email: email, password: password}
        }).then(response => {
            return response.data
        }).catch(error => {
            console.warn(error);
            return false
        });
    }

    async fetchToken({email, password}) {
        const data = await this.tokenizer({email, password});
        if(data)
            this.props.configureApollo(data.login);
        return !!data;
    }

    render() {
        if (this.props.authorized) {
            return (
                <BrowserRouter>
                    <Fragment>
                        <Header/>
                        <ApolloProvider client={this.props.client}>
                            <Route exact path='/' component={Dashboard}/>
                            <Route path='/tickets' render={(props) => <Tickets {...props} client={this.props.client} />}/>
                        </ApolloProvider>
                    </Fragment>
                </BrowserRouter>
            )
        } else {
            return <Login fetchToken={this.fetchToken}/>;
        }
    }
}

export default Root;
