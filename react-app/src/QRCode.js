import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import store from './redux/store';

const uuidv3 = require('uuid/v3');
const QRCodeImage = require('qrcode.react');

const url = 'http://157.230.172.148:3000/api/queries/workExperience?uIDParam=resource%3Aorg.pow.app.User%23';


// QRCode: displays user's resume QR code
class QRCode extends Component {

  // render(): render component
  render() {
    return (
      <div>
        <QRCodeImage id='qr' renderAs='svg' value={url + uuidv3(store.getState().email, uuidv3.URL)} style={{width: '400px', height: '400px', padding: '50px'}} />
        <br></br>
        <p>{uuidv3(store.getState().email, uuidv3.URL)}</p>
      </div>
    );
  }
}

export default QRCode;