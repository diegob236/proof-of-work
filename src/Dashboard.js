import React, { Component } from "react";
import { Button } from "react-bootstrap";
import store from './redux/store'

import './Dashboard.css';


// Dashboard component
class Dashboard extends Component {

  // Constructor
  constructor(props) {
    super(props);
  }

  // renderManagerButtons(): display manager actions if above required permission level
  renderManagerButtons() {
    if (store.getState().permissions === 'MANAGER' ||
        store.getState().permissions === 'ADMINISTRATOR') {
      return <React.Fragment>
              <Button className="menubutton" variant="dark" onClick={() => this.props.history.push('/hire')}>Hire Employee</Button> 
              <Button className="menubutton" variant="dark" onClick={() => this.props.history.push('/manageemployees')}>Manage Employees</Button>
            </React.Fragment>
    }
  }

  // render(): render component
  render() {
    return (
      <div className="Dashboard">
        <h1>Welcome back, {store.getState().email}!</h1>
        <br></br>
        <Button className="menubutton" variant="dark" onClick={() => this.props.history.push('/resume')}>My Resume</Button>
        <Button className="menubutton" variant="dark" onClick={() => this.props.history.push('/scan')}>Scan Resume</Button>
        {this.renderManagerButtons()}
        <Button className="menubutton" variant="dark" onClick={() => this.props.history.push('/createcompany')}>Create Company</Button>
        <Button className="menubutton" variant="dark">Quit Job</Button>
      </div>
    );
  }
}

export default Dashboard;
