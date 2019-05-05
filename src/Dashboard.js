import React, { Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import './Dashboard.css';
import DashboardNavbar from './DashboardNavbar';

const uuidv3 = require('uuid/v3');

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <DashboardNavbar logOut={this.props.logOut}></DashboardNavbar>
        <div className="Dashboard">
          <h1>Welcome back, {this.props.email}!</h1>
          <Button className="menubutton" variant="dark">My Resume</Button>
          <Button className="menubutton" variant="dark">Scan Resume</Button>
          <Button className="menubutton" variant="dark">Hire Employee</Button>
          <Button className="menubutton" variant="dark">Terminate Employee</Button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
