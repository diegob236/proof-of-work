import React, { Component } from "react";
import { Navbar, Button, ButtonToolbar } from "react-bootstrap";

import './Navbar.css'


// Navbar: navbar component
class NavBar extends Component {
  render() {
    return (
      <Navbar style={{ background: '#222222' }}>
        <ButtonToolbar className = 'toolbar'>
          <Button className="btn pull-left" variant="dark" href="/">Home</Button>
          <Button className="btn pull-right" variant="dark" href="/scan">Scan</Button>
          <Button className="btn pull-right" variant="dark" href="/login">Log in</Button>
          <Button className="btn pull-right" variant="dark" href="/signup">Sign Up</Button>
        </ButtonToolbar>
      </Navbar>
    );
  }
}

export default NavBar;
