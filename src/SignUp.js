import React, { Component } from "react";
import { Button, Panel, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import NavBar from './Navbar';

import "./SignUp.css";

const axios = require('axios')
const uuidv3 = require('uuid/v3');

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      $class: "org.pow.app.User",
      uID: "",
      type: "UNEMPLOYED",
      name: "",
      email: "",
      DOB: "",
      phone: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 &&
      this.state.name.length > 0 &&
      this.state.DOB.length == 10 &&
      this.state.phone.length > 9;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleDate = event => {
    this.setState({
      DOB: event.target.value
    });
  }

  handleSubmit = event => {
    var hash = uuidv3(this.state.email, uuidv3.URL)
    var date = this.state.DOB +'T00:00:00.000Z'
    this.setState({
      uID: hash,
      DOB: date
    });

    axios({
      method: 'post',
      url: 'http://157.230.172.148:3000/',
      data: this.state
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
        <NavBar></NavBar>
        <div className='SignUp'>
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
            <FormGroup controlId='email'>
              <ControlLabel>Email Adress</ControlLabel>
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
            <FormGroup controlId='DOB'>
              <ControlLabel>Date of Birth</ControlLabel>
              <FormControl
                  autoFocus
                  type="DOB"
                  value={this.state.DOB}
                  placeholder='YYYY-MM-DD'
                  onChange={this.handleDate}
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
        </div>
      </div>
    );
  }
}

export default Signup;
