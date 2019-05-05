import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DashboardNavbar from './DashboardNavbar';
import ReactDOM from 'react-dom';


const axios = require('axios');
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');

class Fire extends Component {
  constructor(props, job) {
    super(props);

    this.state = {
      email: "",
      employee: job.employee.uId
    };
  }

  validateForm() {
    return this.state.email.length > 0 &&
      this.state.jobTitle.length > 0 &&
      this.state.location.length > 1 &&
      this.state.description.length > 0 &&
      this.state.type !== "UNEMPLOYED"
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = event => {
    var hash = uuidv3(this.state.email, uuidv3.URL)
    var date = this.state.DOB +'T00:00:00.000Z'
    
    var company = {
      $class: "org.pow.app.terminate",
      manager: this.state.email,
    }

    alert(JSON.stringify(user))
    axios({
      method: 'post',
      url: 'http://157.230.172.148:3000/api/newCompany',
      data: company
    })
      .then(function (response){
        console.log(response);
      })
      .catch(function (error){
        console.log(error);
      })
    }

  render() {
    return(
      <div>
        <DashboardNavbar></DashboardNavbar>
        <div className='Hire'>
          <h2>Hire Employee</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup controlId='jobTitle'>
              <ControlLabel>Job Title</ControlLabel>
              <FormControl
                  autoFocus
                  type="jobTitle"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId='email'>
              <ControlLabel>New Employee's Email Adress</ControlLabel>
              <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId="type">
              <ControlLabel>Job Type</ControlLabel>
              <FormControl 
                autoFocus
                type="type"
                ref={select => {this.select = select}}
                componentClass="select"
                value={this.state.type}
                onChange={this.handleChange}>
                  <option value="UNEMPLOYED">Select</option>
                  <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                  <option value="MANAGER">MANAGER</option>
                  <option value="WORKER">WORKER</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId='description'>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                  autoFocus
                  type="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId='location'>
              <ControlLabel>Location</ControlLabel>
              <FormControl
                  autoFocus
                  type="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                />
            </FormGroup>
            <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Create
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Fire;
