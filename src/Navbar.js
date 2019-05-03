import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
      <Navbar style={{ height: '50px', background: '#222222'}}>
        <Button className="btn pull-right" variant="dark">sign up</Button>
        <Button className="btn pull-right" variant="dark">log in</Button>
      </Navbar>
    );
  }
}

export default NavBar;
