import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import './Login.css';

const axios = require('axios')
const uuidv3 = require('uuid/v3');


// Login: login page component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      invalid: false
    };
  }

  // validateForm(): check for valid email
  validateForm() {
    return this.state.email.length > 0;
  }

  // handleChange(): update state
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // handleSubmit(): send log in request to server
  handleSubmit = event => {
    event.preventDefault();
    axios({
      method: 'get',
      url: 'http://157.230.172.148:3000/api/User/' + uuidv3(this.state.email, uuidv3.URL)
    })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({invalid: false});
        this.props.logIn(this.state.email, response.data.type);
      }
      else {
        this.setState({invalid: true})
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({invalid: true});
    })
  }

  // displayError(): display error for invalid user
  displayError() {
    if (this.state.invalid) {
      return <div className ='error'>User not found.</div>
    }
  }

  // render(): render component
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bsSize="large">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        {this.displayError()}
      </div>
    );
  }
}

export default Login;