import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Login from './Login';
import NavBar from './Navbar';
import Scanner from './Scanner';
import './App.css';

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
