import React, { Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import './Welcome.css';

const uuidv3 = require('uuid/v3');

class Welcome extends Component {
  render() {
    return (
      <div className="App">
        <div className='welcome'>
          <h1>Welcome to Proof of Work!</h1>
        </div>
        <ButtonGroup vertical style={{align: 'center'}}>
          <Button className="btn pull-right" variant="dark" href="/scan">Scan</Button>
          <Button className="btn pull-right" variant="dark" href="/login">Log in</Button>
          <Button className="btn pull-right" variant="dark" href="/signup">Sign Up</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Welcome;
