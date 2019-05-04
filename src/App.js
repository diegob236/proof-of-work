import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Welcome from './Welcome';
import Scanner from './Scanner';
import Login from './Login';
import Signup from './SignUp';

import './App.css';

const uuidv3 = require('uuid/v3');

function App() {
  return (
    <div className="App">
      <Route path="/" exact component={Welcome} />
      <Route path="/scan" component={Scanner} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </div>
  );
}

export default App;
