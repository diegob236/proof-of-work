import React, { Component } from 'react'
import store from './redux/store'

const axios = require('axios');
const uuidv3 = require('uuid/v3');


// ManageEmployees: hire, terminate, or view employees
class ManageEmployees extends Component{

  // Constructor
  constructor(props){
    super(props);
    this.getEmployees = this.getEmployees.bind(this);
  }

  // componentDidMount(): send request to get employees
  componentDidMount() {
    this.getEmployees();
  }

  // getEmployees(): retreve employees from server
  getEmployees() {
    axios({
      method: 'get',
      url: 'http://157.230.172.148:3000/api/queries/findJobs?managerID=resource%3Aorg.pow.app.User%23' + uuidv3(store.getState().email, uuidv3.URL)
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // render(): render component
  render() {
    return (
      <div>
        <br></br>
        <h2>Your Employees:</h2>
        <br></br>
      </div>
    );
  }
}

export default ManageEmployees;