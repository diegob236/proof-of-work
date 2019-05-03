import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Login from './Login';
import NavBar from './Navbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Login></Login>
    </div>
  );
}

export default App;
