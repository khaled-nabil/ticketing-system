import React, {Component} from "react";
import ReactDOM from "react-dom";
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {ApolloProvider} from "react-apollo";
import {BrowserRouter, Route} from "react-router-dom";
import authToken from './redux/reducers'
import {mapStateToProps, mapDispatchToProps} from './redux/connectors'
import Home from "./components/home";
import {authLink, httpLink} from "./helpers/apolloGenerator"
///import 'bootstrap/dist/css/bootstrap.min.css';

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

    }
    configureApollo() {
        console.log("Update Apollo Token",this.props.token);
        this.setState({
            client: new ApolloClient({
                link: authLink(this.props.token).concat(httpLink),
                cache: new InMemoryCache()
            })
        });
    }
    render() {
        return (
            <ApolloProvider client={this.state.client}>
                <BrowserRouter>
                    <Route exact path='/' render={() => <Home {...(this.props)} {...(this.state)} configureApollo={this.configureApollo} />}/>
                </BrowserRouter>
            </ApolloProvider>
        )
    }
}

const ReduxConnector = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<Provider store={store}><ReduxConnector/></Provider>, document.getElementById("react-loader"));
