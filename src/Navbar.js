import React, { Component } from "react";
import { Navbar, Button, ButtonToolbar } from "react-bootstrap";

import './Navbar.css'


// Navbar: navbar component
class NavBar extends Component {
  render() {
    return (
      <Navbar style={{ background: '#222222' }}>
        <ButtonToolbar className = 'toolbar'>
          <Button className="btn pull-left" variant="dark" onClick={() => {this.props.history.push("/")}}>Home</Button>
          {this.props.location.pathname !== '/scan' ? <Button className="btn pull-right" variant="dark" onClick={() => {this.props.history.push("/scan")}}>Scan</Button> : null}
          {this.props.location.pathname !== '/login' ? <Button className="btn pull-right" variant="dark" onClick={() => {this.props.history.push("/login")}}>Log in</Button> : null}
          {this.props.location.pathname !== '/signup' ? <Button className="btn pull-right" variant="dark" onClick={() => {this.props.history.push("/signup")}}>Sign Up</Button> : null}
        </ButtonToolbar>
      </Navbar>
    );
  }
}

export default NavBar;
