import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar style={{ height: '50px', background: '#222222' }}>
        <Button className="btn pull-right" variant="dark" href="/signup">sign up</Button>
        <Button className="btn pull-right" variant="dark" href="/login">log in</Button>
        <Button className="btn pull-right" variant="dark" href="/scan">scan</Button>
      </Navbar>
    );
  }
}

export default NavBar;
