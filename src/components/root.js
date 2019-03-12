import React, {Component, Fragment} from 'react';
import {getToken} from "../constants/queries"
import Login from "./login"
import Dashboard from "./dashboard"
import Tickets from "./tickets"
import Header from "./shared/header"
import {BrowserRouter, Route, Switch} from "react-router-dom";

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
                <BrowserRouter>
                    <Fragment>
                        <Header/>
                        <Switch>
                            <Route exact path='/' component={Dashboard}/>
                            <Route path='/tickets' component={Tickets}/>
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            )
        } else {
            return <Login fetchToken={this.fetchToken}/>;
        }
    }
}
export default Root;
