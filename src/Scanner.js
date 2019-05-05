import React, { Component } from 'react'
import QrReader from 'react-qr-reader'

import Resume from './Resume'

import './Scanner.css' 

const axios = require('axios');


// Scanner: scan QR code
class Scanner extends Component {

  // Constructor
  constructor(props){
    super(props)
    this.state = {
      result: [],
      hasScanned: false
    }
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
  }
 
  // handleScan(): get scan data
  handleScan = data => {
    if (data) {
      axios({
        method: 'get',
        url: 'http://157.230.172.148:3000/api/queries/workExperience?uIDParam=resource:org.pow.app.User#'+this.state.uId
      })
      .then(function (response){
        console.log(response);
        this.setState({
          result: response,
          hasScanned: true
        });
      })
      .catch(function (error){
        alert('Can\'t find that user:'+error)
      });   
    }
  }

  // handleError(): log errors
  handleError = err => {
    console.log(err)
  }

  // render(): render component
  render() {
    const hasScanned = this.state.hasScanned;
    let viewable;
    if (hasScanned){
      viewable = <Resume jobList={this.result}></Resume>;
    }
    else{
      viewable = <QrReader
        delay={300}
        onError={this.handleError}
        onScan={this.handleScan}
        style={{ width: '100%', height: '100%' }}
      />;
    }
    return (
      <div className="Scanner">
        {viewable}
      </div>
    )
  }
}

export default Scanner;