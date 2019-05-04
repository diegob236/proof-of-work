import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import './Scanner.css'
import NavBar from './Navbar';
 
class Scanner extends Component {

  state = {
    result: 'No result'
  }
 
  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }

  handleError = err => {
    console.error(err)
  }

  render() {
    return (
      <div className="Scanner">
        <NavBar></NavBar>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    )
  }
}

export default Scanner;