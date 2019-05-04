import React, { Component } from "react";
import {
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";

import "./SignUp.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      $class: "org.pow.app.User",
      uID: "",
      type: "UNEMPLOYED",
      name: "",
      email: "",
      DOB: "",
      phone: "",
    };
  }

validateForm() {
  return this.state.email.length > 0 &&
    this.state.name.length > 0 &&
    this.state.DOB > 0 &&
    this.state.phone > 9;
}

handleChange = event => {
  this.setState({
    [event.target.id]: EventTarget.value
  });
}

handleSubmit = event => {
  
}

  renderForm(){
    return(
      <form onSubmit={this.handleSubmit()}>
        <FormGroup controlId='name'>
          <Form.Label>Name</Form.Label>
          <ControlLabel type="name" placeholder="Enter your first and last name" />
          <Form.Control
              autoFocus
              type="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
        </FormGroup>
        <FormGroup controlId='email'>
          <Form.Label>Email Adress</Form.Label>
          <ControlLabel type="email" placeholder="Enter email" />
          <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
        </FormGroup>
        
        <FormGroup controlId='phone'>
          <Form.Label>Phone Number</Form.Label>
          <ControlLabel type="phone" placeholder="" />
          <Form.Control
              autoFocus
              type="phone"
              value={this.state.phone}
              onChange={this.handleChange}
            />
        </FormGroup>
        <FormGroup controlId='DOB'>
          <Form.Label>Date of Birth</Form.Label>
          <ControlLabel type="DOB" placeholder="" />
          <Form.Control
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
            Sign Up
          </Button>
      </form>
    );
  }
}
