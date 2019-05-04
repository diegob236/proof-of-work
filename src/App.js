import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login';
import NavBar from './Navbar';
import Scanner from './Scanner';
import Signup from './SignUp';
import './App.css';

const uuidv3 = require('uuid/v3');

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Route path="/scan" component={Scanner} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default App;
