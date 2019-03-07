import React from 'react';
import {Query} from "react-apollo";
import {getToken} from "../constants/queries"
import Login from "./login"
import Home from "./home"

class Root extends React.Component {
     constructor(props) {
        super(props);
        this.checkToken().then(() => {
            this.props.configureApollo();
        });
         this.checkToken = this.checkToken.bind(this);
         this.fetchToken = this.fetchToken.bind(this);
     }

    componentDidUpdate() {
        console.log("did update",this.props);
    }

    async checkToken() {
        if (this.props.token)
            return this.props.token;
        else {
           // return await this.fetchToken("helgvlo@gmail.com", "132");
        }
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
        this.props.updateToken({token: data.login});
        return true;
    }

    render() {
        if (this.props.token) {
            return (
                <Home />
            )
        } else {
            return <Login fetchToken={this.fetchToken} />;
        }
    }
}

export default Root;
