import React, {Component} from "react";
import ReactDOM from "react-dom";
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {ApolloProvider} from "react-apollo";
import authToken from './redux/reducers'
import {mapStateToProps, mapDispatchToProps} from './redux/connectors'
import Root from "./components/root";
import {validateLogin} from "./constants/queries"
import {authLink, httpLink} from "./helpers/apolloGenerator"

const store = createStore(authToken);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            client: new ApolloClient({
                link: authLink(this.props.token).concat(httpLink),
                cache: new InMemoryCache()
            })
        };
        this.configureApollo = this.configureApollo.bind(this);
        let token = localStorage.getItem("token");
        if (token) this.configureApollo(token);
    }

    configureApollo(token) {
        this.props.updateToken(token);
        localStorage.setItem("token", token);
        this.setState({
            client: new ApolloClient({
                link: authLink(token).concat(httpLink),
                cache: new InMemoryCache()
            })
        });
        let validToken = this.state.client.query({
            query: validateLogin
        }).then(response => {
            return !!response.data.self;
        }).catch(error => {
            console.warn(error);
            return false
        });
        this.props.setTokenValidity(validToken);
    }

    render() {
        return (
            <ApolloProvider client={this.state.client}>
                <Root {...(this.props)} {...(this.state)}
                      configureApollo={this.configureApollo}/>
            </ApolloProvider>
        )
    }
}

const ReduxConnector = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<Provider store={store}><ReduxConnector/></Provider>, document.getElementById("react-loader"));
