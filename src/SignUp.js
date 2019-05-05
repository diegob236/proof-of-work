import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import "./SignUp.css";

const axios = require('axios');
const uuidv3 = require('uuid/v3');


// Signup: registration component
class Signup extends Component {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      DOB: "",
      phone: ""
    };
  }

  // validateForm(): check for valid input
  validateForm() {
    return this.state.email.length > 0 &&
      this.state.name.length > 0 &&
      this.state.DOB.length === 10 &&
      this.state.phone.length > 9;
  }

  // handleChange(): update state
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // handleSubmit(): post data to server
  handleSubmit = event => {
    var hash = uuidv3(this.state.email, uuidv3.URL)
    var date = this.state.DOB +'T00:00:00.000Z'
    var user = {
      uID: hash,
      type: "UNEMPLOYED",
      name: this.state.name,
      email: this.state.email,
      DOB: date,
      phone: this.state.phone
    }
    alert(JSON.stringify(user))
    axios({
      method: 'post',
      url: 'http://157.230.172.148:3000/api/User',
      data: user
    })
    .then(function (response){
      console.log(response);
      this.props.logIn(response.data.email, response.data.type);
    })
    .catch(function (error){
      console.log(error);
    })
  }

  // render(): render component
  render() {
    return(
      <div className='SignUp'>
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
          <Form.Group controlId='DOB'>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
                autoFocus
                type="DOB"
                value={this.state.DOB}
                placeholder='YYYY-MM-DD'
                onChange={this.handleChange}
              />
          </Form.Group>
          <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
            >
              Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
