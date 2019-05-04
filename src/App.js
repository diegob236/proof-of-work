import React, { Component } from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";

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

  logIn(email) {
    this.setState({email: email, loggedIn: true})
    console.log(this.state)
    this.props.history.push("/dashboard")
  }

  render() {
    return (
      <div className="App">
        <Route path="/" exact component={Welcome} />
        <Route path="/scan" component={Scanner} />
        <Route path="/login" render={props => <Login logIn = {this.logIn.bind(this)} />} />
        <Route path="/signup" render={props => <Signup logIn = {this.logIn.bind(this)} />} />
        <PrivateRoute authed={this.state.loggedIn} path='/dashboard' component={Dashboard} />
      </div>
    );
  }
}

export default withRouter(App);
