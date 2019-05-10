import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
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
      this.state.email !== store.getState().email &&
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
      this.props.history.push("/dashboard");
    }

  // render(): render component
  render() {
    return(
      <div className='NewCompany'>
        <h2>Create Company:</h2>
        <br></br>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
                autoFocus
                type="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
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
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
          </Form.Group>
          <Form.Group controlId='phone'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
                autoFocus
                type="phone"
                value={this.state.phone}
                onChange={this.handleChange}
              />
          </Form.Group>
          <Button
              block
              bssize="large"
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

export default NewCompany;