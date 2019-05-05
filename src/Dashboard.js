import React, { Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import './Dashboard.css';
import DashboardNavbar from './DashboardNavbar';

const axios = require('axios');
const uuidv3 = require('uuid/v3');

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.getResume = this.getResume.bind(this);
  }

  getResume() {
    axios({
      method: 'get',
      url: 'http://157.230.172.148:3000/api/queries/workExperience/' + uuidv3(this.props.email, uuidv3.URL)
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      alert('No jobs found for ' + this.props.email);
    })
  }

  render() {
    return (
      <div>
        <DashboardNavbar logOut={this.props.logOut}></DashboardNavbar>
        <div className="Dashboard">
          <h1>Welcome back, {this.props.email}!</h1>
          <Button className="menubutton" variant="dark" onClick={() => this.getResume()}>My Resume</Button>
          <Button className="menubutton" variant="dark" href="/scan">Scan Resume</Button>
          <Button className="menubutton" variant="dark">Hire Employee</Button>
          <Button className="menubutton" variant="dark">Terminate Employee</Button>
          <Button className="menubutton" variant="dark">Create Company</Button>
          <Button className="menubutton" variant="dark">Quit Job</Button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
