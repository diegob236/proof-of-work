import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import './Scanner.css'
import NavBar from './Navbar';
import Resume from './Resume'
 

const axios = require('axios');

class Scanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: [],
      hasScanned: false
    }
    this.handleScan = this.handleScan.bind(this);
  }
 
  handleScan = data => {
    if (data) {
        axios({
          method: 'get',
          url: 'http://157.230.172.148:3000/api/queries/workExperience?uIDParam='+this.state.uId
        })
        .then(function (response){
          this.setState({
            result: response,
            hasScanned: true
          });
        })
        .catch(function (error){
          alert('Cant find that user:'+error)
        });
      
      
    }

  }



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
        <NavBar></NavBar>
        {viewable}
      </div>
    )
  }
}

export default Scanner;