import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import "./SignUp.css";

const axios = require('axios');
const uuidv3 = require('uuid/v3');

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      DOB: "",
      phone: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 &&
      this.state.name.length > 0 &&
      this.state.DOB.length === 10 &&
      this.state.phone.length > 9;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


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
      })
      .catch(function (error){
        console.log(error);
      })
    }

  render() {
    return(
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
      </div>
    );
  }
}

export default Signup;
