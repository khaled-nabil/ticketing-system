import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import {CookiesProvider} from 'react-cookie';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./components/home";
//import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
    uri: "http://localhost:4000"
});
const App = () => (
    <ApolloProvider client={client}>
        <CookiesProvider>
            <BrowserRouter>
                <Route exact path='/' component={Home} />
            </BrowserRouter>
        </CookiesProvider>
    </ApolloProvider>
);

ReactDOM.render(<App/>, document.getElementById("react-loader"));
