import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";

import Dashboard from './Dashboard';
import DashboardNavbar from './DashboardNavbar';
import Login from './Login';
import NavBar from './Navbar';
import PrivateRoute from './PrivateRoute';
import Scanner from './Scanner';
import Signup from './SignUp';
import Welcome from './Welcome';

import store from './redux/store'
import loginAction from './redux/loginAction';

import './App.css';


// App: main component
class App extends Component {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      loggedIn: false,
      permissions: 'UNEMPLOYED'
    }
    store.subscribe(() => {
      this.setState(store.getState());
    });
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  // logIn(): authenticate user and take them to the dashboard
  logIn(email, permissions) {
    this.setState({email: email, loggedIn: true, permissions: permissions}, () => {console.log(this.state)});
    store.dispatch(loginAction(this.state));
    this.props.history.push("/dashboard");
  }

  // logOut(): log out user and take them to the welcome screen
  logOut() {
    this.setState({email: '', loggedIn: false, permissions: 'UNEMPLOYED'}, () => {console.log(this.state)});
    store.dispatch(loginAction({email: '', loggedIn: false, permissions: 'UNEMPLOYED'}));
    this.props.history.push("/");
  }

  // renderDashboard(): display different dashboard depending on if user is logged in or not
  renderDashboard() {
    if (this.props.location.pathname !== '/') {
      return this.state.loggedIn ? <DashboardNavbar history={this.props.history} logOut={this.logOut}></DashboardNavbar> : <NavBar></NavBar>
    }
  }

  // render(): render component
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
