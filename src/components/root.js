import React, {Component, Fragment} from 'react';
import {getToken} from "../constants/queries"
import Login from "./login"
import Home from "./home"
import Tickets from "./tickets"
import Header from "./portlets/header"
import {BrowserRouter, Route, Switch, withRouter} from "react-router-dom";

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
                        <Route path='/' render={() => <Header/>}/>
                        <Switch>
                            <Route exact path='/' render={() => <Home/>}/>
                            <Route path='/tickets' render={() => <Tickets/>}/>
                        </Switch>
                    </Fragment>
                </BrowserRouter>
            )
        } else {
            return <Login fetchToken={this.fetchToken}/>;
        }
    }
}
//TODO configure withRouter correctly to load on click
export default withRouter(Root);
