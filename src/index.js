import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory'; ;;;;;;
import {Provider, connect} from 'react-redux';
import {createStore} from 'redux';
import authToken from './redux/reducers';
import {mapStateToProps, mapDispatchToProps} from './redux/connectors';
import Root from './components/root';
import {validateLogin} from './constants/queries';
import {authLink, httpLink} from './helpers/apolloGenerator';
import './assets/css/main.css';
const store = createStore(authToken);

/**
* Main app class, checks for token and configures graphql
* and redux
*/
class App extends Component {
  /**
   * get localstorage token (if any),
   * create apollo client with stored token
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const token = localStorage.getItem('token');
    this.state = {
      client: new ApolloClient({
        link: authLink(token).concat(httpLink),
        cache: new InMemoryCache(),
      }),
    };
    console.log();
    this.configureApollo = this.configureApollo.bind(this);
    this.validateToken = this.validateToken.bind(this);
  }

  /**
   * check if token has been validated upon mount
   */
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.validateToken();
    }
  }
  /**
   * request user id based on token,
   * if possible set validity to true
   */
  validateToken() {
    // TODO: Move ticket validation to Server end on request
    this.state.client.query({
      query: validateLogin,
    }).then((response) => {
      this.props.setTokenValidity(!!response.data.self);
      return !!response.data.self;
    }).catch((error) => {
      console.warn(error);
      return false;
    });
  }

  /**
   * function to handle setting new apollo connection
   * once token is recieved and validate state
   * @param {String} token
   */
  configureApollo(token) {
    this.props.updateToken(token);
    localStorage.setItem('token', token);
    this.setState({
      client: new ApolloClient({
        link: authLink(token).concat(httpLink),
        cache: new InMemoryCache(),
      }),
    });
    this.validateToken();
  }

  /**
   * render the main component
   * @return {Component}
   */
  render() {
    return (
      <Root {...(this.props)} {...(this.state)}
        configureApollo={this.configureApollo}/>
    );
  }
}

const ReduxConnector = connect(mapStateToProps, mapDispatchToProps)(App);
ReactDOM.render(<Provider store={store}><ReduxConnector/></Provider>,
    document.getElementById('react-loader'));
