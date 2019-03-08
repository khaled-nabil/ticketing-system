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

    }
    configureApollo() {
        this.setState({
            client: new ApolloClient({
                link: authLink(this.props.token).concat(httpLink),
                cache: new InMemoryCache()
            })
        });
        if(this.props.token)
            this.props.setTokenValidity(true);
    }
    render() {
        return (
            <ApolloProvider client={this.state.client}>
                <Root {...(this.props)} {...(this.state)} configureApollo={this.configureApollo} />
            </ApolloProvider>
        )
    }
}
/*<BrowserRouter>
    <Route exact path='/' render={() => <Root {...(this.props)} {...(this.state)} configureApollo={this.configureApollo} />}/>
</BrowserRouter>*/

const ReduxConnector = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<Provider store={store}><ReduxConnector/></Provider>, document.getElementById("react-loader"));
