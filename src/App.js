import React, { Component } from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";

import Welcome from './Welcome';
import Scanner from './Scanner';
import Login from './Login';
import Signup from './SignUp';
import Dashboard from './Dashboard';
import DashboardNavbar from './DashboardNavbar';
import NavBar from './Navbar';
import store from './redux/store'
import loginAction from './redux/loginAction';

import './App.css';


function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} {...rest} />
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
    store.subscribe(() => {
      this.setState(store.getState());
    });
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logIn(email) {
    this.setState({email: email, loggedIn: true}, () => {console.log(this.state)});
    store.dispatch(loginAction(this.state));
    this.props.history.push("/dashboard");
  }

  logOut() {
    this.setState({email: '', loggedIn: false}, () => {console.log(this.state)});
    store.dispatch(loginAction({email: '', loggedIn: false}));
    this.props.history.push("/");
  }

  renderDashboard() {
    if (this.props.location.pathname !== '/') {
      return this.state.loggedIn ? <DashboardNavbar history={this.props.history} logOut={this.logOut}></DashboardNavbar> : <NavBar></NavBar>
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderDashboard()}
        <Route path="/" exact component={Welcome} />
        <Route path="/scan" render={props => <Scanner />} />
        <Route path="/login" render={props => <Login logIn={this.logIn.bind(this)} />} />
        <Route path="/signup" render={props => <Signup logIn={this.logIn.bind(this)} />} />
        <PrivateRoute authed={this.state.loggedIn} path='/dashboard' component={Dashboard} />
      </div>
    );
  }
}

export default withRouter(App);
