import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'
import {ApolloProvider} from "react-apollo";
import {BrowserRouter, Route} from "react-router-dom";
import authToken from './redux/reducers'
import {mapStateToProps, mapDispatchToProps} from './redux/connectors'
import Home from "./components/home";

//import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
    uri: "http://localhost:4000",
    headers: {authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjNWFlNDM5Nzc1NWE5NTJiODhhNWEyZSIsImlhdCI6MTU1MDQyMzA2OCwiZXhwIjoxNTUwNDI2NjY4fQ.GsY4u7loduE3-YsC4l9zkgNJbBMezzfq-ZWjczlRTJY"}
});
const store = createStore(authToken);

const App = () => (
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Route exact path='/' component={Home}/>
        </BrowserRouter>
    </ApolloProvider>
);
const ReduxConnector = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<Provider store={store}><ReduxConnector/></Provider>, document.getElementById("react-loader"));
