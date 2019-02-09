import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";
import Users from "./users";

const client = new ApolloClient({
    uri: "http://localhost:4000"
});
const App = () => (
    <ApolloProvider client={client}>
        <div>
            <h2>My first Apollo app</h2>
            <Users />
        </div>
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById("react-loader"));
