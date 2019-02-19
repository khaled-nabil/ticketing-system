import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {URI} from "../constants/connection";

const httpLink = createHttpLink({
    uri: URI,
});

const authLink = (token) =>
    setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                authorization: token,
            }
        }
    });

export {authLink, httpLink}
//new ApolloClient({uri: URI,headers:{authorization:""}})
