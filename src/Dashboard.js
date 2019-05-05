import React, { Component } from "react";
import { Button } from "react-bootstrap";
import store from './redux/store'
import Resume from './Resume.js'

import './Dashboard.css';

const axios = require('axios');
const uuidv3 = require('uuid/v3');


// Dashboard component
class Dashboard extends Component {

  // Constructor
  constructor(props) {
    super(props);
    this.getResume = this.getResume.bind(this);
  }

  // getResume(): query server for your work experience
  getResume() {
    axios({
      method: 'get',
      url: 'http://157.230.172.148:3000/api/queries/workExperience/' + uuidv3(store.getState().email, uuidv3.URL)
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
      alert('No jobs found for ' + store.getState().email);
    })
  }

  // render(): render component
  render() {
    return (
      <div className="Dashboard">
        <h1>Welcome back, {store.getState().email}!</h1>
        <Button className="menubutton" variant="dark" onClick={() => this.getResume()}>My Resume</Button>
        <Button className="menubutton" variant="dark" onClick={() => this.props.history.push('/scan')}>Scan Resume</Button>
        <Button className="menubutton" variant="dark">Hire Employee</Button>
        <Button className="menubutton" variant="dark">Terminate Employee</Button>
        <Button className="menubutton" variant="dark">Create Company</Button>
        <Button className="menubutton" variant="dark">Quit Job</Button>
      </div>
    );
  }
}

export default Dashboard;
