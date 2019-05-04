import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import './Navbar.css'

class NavBar extends Component {
  render() {
    return (
      <Navbar style={{ background: '#222222' }}>
        <Button className="btn pull-left" variant="dark" href="/">Home</Button>
        <Button className="btn pull-right" variant="dark" href="/scan">Scan</Button>
        <Button className="btn pull-right" variant="dark" href="/login">Log in</Button>
        <Button className="btn pull-right" variant="dark" href="/signup">Sign Up</Button>
      </Navbar>
    );
  }
}

export default NavBar;
