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
      type: "",
      name: "",
      email: "",
      DOB: "",
      phone: "",
    };
  }

  renderForm(){
    return(
      <form onSubmit={this.handleSubmit()}>
        <FormGroup controlId='email'>
          <FormLabel>Email Adress</FormLabel>
          <ControlLabel type="email" placeholder="Enter email" />
        </FormGroup>
      </form>
    );
  }
}
