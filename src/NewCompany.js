import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import store from './redux/store';

import './NewCompany.css';

const axios = require('axios');
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');


// NewCompany: form to create a new company
class NewCompany extends Component {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      description: "",
      email: "",
      phone: ""
    };
  }

  // validateForm(): check for valid input
  validateForm() {
    return this.state.email.length > 0 &&
      this.state.email !== this.props.email &&
      this.state.name.length > 0 &&
      this.state.location.length > 1 &&
      this.state.description.length > 0 &&
      this.state.phone.length > 9;
  }

  // handleChange(): update state
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // handleSubmit(): send request to server
  handleSubmit = event => {
    var company = {
      $class: "org.pow.app.newCompany",
      companyID: uuidv3(this.state.email, uuidv3.URL),
      founderJobID: uuidv1(),
      name: this.state.name,
      location: this.state.location,
      description: this.state.description,
      email: this.state.email,
      phone: this.state.phone,
      founder: uuidv3(store.getState().email, uuidv3.URL)
    }
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

  // render(): render component
  render() {
    return(
      <div className='NewCompany'>
        <h2>Create Company</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='name'>
            <ControlLabel>Name</ControlLabel>
            <FormControl
                autoFocus
                type="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
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
          <FormGroup controlId='email'>
            <ControlLabel>Email Address</ControlLabel>
            <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
          </FormGroup>
          <FormGroup controlId='phone'>
            <ControlLabel>Phone Number</ControlLabel>
            <FormControl
                autoFocus
                type="phone"
                value={this.state.phone}
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
        </form>
      </div>
    );
  }
}

export default NewCompany;