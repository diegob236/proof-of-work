import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

import Welcome from './Welcome';
import Scanner from './Scanner';
import Login from './Login';
import Signup from './SignUp';
import Dashboard from './Dashboard';

import './App.css';

const uuidv3 = require('uuid/v3');

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loggedIn: false
    }
  }

  render() {
    return (
      <div className="App">
        <p>{uuidv3('jimmy@.com', uuidv3.URL)}</p>
        <Route path="/" exact component={Welcome} />
        <Route path="/scan" component={Scanner} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute authed={this.state.loggedIn} path='/dashboard' component={Dashboard} />
      </div>
    );
  }
}

export default App;
