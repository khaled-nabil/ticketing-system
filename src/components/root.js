import React from 'react';
import {Query} from "react-apollo";
import {getToken} from "../constants/queries"
import Login from "./login"
import Home from "./home"

class Root extends React.Component {
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
            return {}
        });
    }

    async fetchToken({email, password}) {
        const data = await this.tokenizer({email, password});
        this.props.configureApollo(data.login);
    }

    render() {
        if (this.props.authorized) {
            return (
                <Home/>
            )
        } else {
            return <Login fetchToken={this.fetchToken}/>;
        }
    }
}

export default Root;
