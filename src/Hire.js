import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import './Hire.css'
import store from "./redux/store";

const axios = require('axios');
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');


// Hire: hire a new employee
class Hire extends Component {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      email: "",
      location: "",
      description: "",
      type: "UNEMPLOYED"
    };
  }

  // validateForm(): check for valid input
  validateForm() {
    return this.state.email.length > 0 &&
      this.state.jobTitle.length > 0 &&
      this.state.location.length > 1 &&
      this.state.description.length > 0 &&
      this.state.type !== "UNEMPLOYED"
  }

  // handleChange(): update state
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // handleSubmit(): submit new employee request
  handleSubmit = event => {
    var employee = {
      $class: "org.pow.app.hire",
      jobID: uuidv1(),
      jobTitle: this.state.jobTitle,
      location: this.state.location,
      description: this.state.description,
      type: this.state.type,
      manager: "resource:org.pow.app.User#" + uuidv3(store.getState().email, uuidv3.URL),
      employee: "resource:org.pow.app.User#" + uuidv3(this.state.email, uuidv3.URL)
    }
    axios({
      method: 'post',
      url: 'http://157.230.172.148:3000/api/hire',
      data: employee
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // render(): render component
  render() {
    return(
      <div className='Hire'>
        <h2>Hire Employee</h2>
        <br></br>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='jobTitle'>
            <Form.Label>Job Title</Form.Label>
            <Form.Control
                autoFocus
                type="jobTitle"
                value={this.state.name}
                onChange={this.handleChange}
              />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>New Employee's Email Address</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Job Type</Form.Label>
            <Form.Control 
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
            </Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
                autoFocus
                type="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
          </Form.Group>
          <Form.Group controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Control
                autoFocus
                type="location"
                value={this.state.location}
                onChange={this.handleChange}
              />
          </Form.Group>
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
    );
  }
}

export default Hire;
