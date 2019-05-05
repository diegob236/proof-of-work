import React, { Component } from "react";
import { Navbar, Button, ButtonToolbar } from "react-bootstrap";
import './Navbar.css'


// DashboardNavbar: navbar for logged in users
class DashboardNavbar extends Component {
  render() {
    return (
      <Navbar style={{ background: '#222222' }}>
        <ButtonToolbar className = 'toolbar'>
          <Button className="btn pull-left" variant="dark" onClick={()=>{this.props.history.push("/dashboard")}}>Dashboard</Button>
          <Button className="btn pull-right" variant="dark" onClick={() => this.props.logOut()}>Log out</Button>
        </ButtonToolbar>
      </Navbar>
    );
  }
}

export default DashboardNavbar;
