import React, { Component } from "react";
import { Button, ButtonGroup } from "react-bootstrap";

import './Welcome.css';


// Welcome: homepage component
class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
        <div className='banner'>
          <h1>Welcome to Proof of Work!</h1>
        </div>
        <ButtonGroup vertical className='buttonGroup'>
          <Button className="btn-home" variant="dark" href="/scan">Scan</Button>
          <Button className="btn-home" variant="dark" href="/login">Log in</Button>
          <Button className="btn-home" variant="dark" href="/signup">Sign Up</Button>
        </ButtonGroup>
      </div>
    );
  }
}

export default Welcome;
