import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Login.css';
import NavBar from "./Navbar";

const axios = require('axios')
const uuidv3 = require('uuid/v3');


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      invalid: false
    };
  }

  validateForm() {
    return this.state.email.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

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
        this.props.logIn(this.state.email);
      }
      else {
        this.setState({invalid: true})
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  displayError() {
    if (this.state.invalid) {
      return <div className ='error'>User not found.</div>
    }
  }

  render() {
    return (
      <div>
        <NavBar></NavBar>
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
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
      </div>
    );
  }
}
