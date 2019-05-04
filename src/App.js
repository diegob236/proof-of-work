import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Login from './Login';
import NavBar from './Navbar';
import Scanner from './Scanner';
import './App.css';

const uuidv3 = require('uuid/v3');

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Scanner></Scanner>
      <Login></Login>
    </div>
  );
}

export default App;
