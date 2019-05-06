import React, { Component } from 'react'
import { Button, CardGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import store from './redux/store'

const axios = require('axios');
const uuidv3 = require('uuid/v3');


// ManageEmployees: hire, terminate, or view employees
class ManageEmployees extends Component{

  // Constructor
  constructor(props){
    super(props);
    this.state={
      employeeData: [],
      employeeJobs: []
    }
    this.getEmployeeData = this.getEmployeeData.bind(this);
    this.getEmployeeJobData = this.getEmployeeJobData.bind(this);
    this.populateEmployeeData = this.populateEmployeeData.bind(this);
    this.renderEmployees = this.renderEmployees.bind(this);
  }

  // componentDidMount(): send request to get employees
  async componentDidMount() {
    await this.getEmployeeJobData();
  }

  // getEmployees(): retrieve employee data from server by ID
  getEmployeeData(employeeID) {
    axios({
      method: 'get',
      url: 'http://157.230.172.148:3000/api/User/' + employeeID
    })
    .then((response) => {
      console.log(response.data);
      var joined = this.state.employeeData.concat(response.data);
      this.setState({ employeeData: joined });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // getEmployeeJobData(): retrieve employee job data from server
  getEmployeeJobData() {
    axios({
      method: 'get',
      url: 'http://157.230.172.148:3000/api/queries/findJobs?managerID=resource%3Aorg.pow.app.User%23' + uuidv3(store.getState().email, uuidv3.URL)
    })
    .then((response) => {
      console.log(response);
      this.populateEmployeeData(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // populateEmployeeData(): populate employee data variables from job and user list
  async populateEmployeeData(data) {
    let jobs = [];
    let employees = [];
    for (let i = 0; i < data.length; i++){
      if (data[i].employee !== 'resource:org.pow.app.User#' + uuidv3(store.getState().email, uuidv3.URL) &&
            typeof(data[i].endDate) === 'undefined') {
        await this.getEmployeeData(data[i].employee.split('#')[1]);
        jobs.push(data[i]);
      }
    }
    await this.setState({
      employeeJobs: jobs
    });
  }

  // handleTerminate(): terminate/fire an employee
  handleTerminate(job){
    let terminateData = {
      "$class": "org.pow.app.terminate",
      "job": job,
      "manager": uuidv3(store.getState().email, uuidv3.URL),
      "employee": job.employee
    }
    axios({
      method: 'post',
      url: 'http://157.230.172.148:3000/api/terminate',
      data: terminateData
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  // renderEmployees(): render employee data
  renderEmployees() {
    let employees = []
    for (let i = 0; i < this.state.employeeJobs.length; i++){
      console.log(this.state);
      let job = this.state.employeeJobs[i]
      employees.push(
        <div key={job.startDate} as="li">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{job.jobTitle}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{job.company.name}</Card.Subtitle>
              <Card.Text>
                {job.description}
              </Card.Text>
              <Card.Text>
                {job.type}
              </Card.Text>
              {typeof(job.endDate) !== 'undefined' ?  '' : 
              <Button variant="danger" onClick={this.handleTerminate}>Terminate</Button>}
            </Card.Body>
          </Card>
        </div>
      )
    }
    return employees;
  }

  // render(): render component
  render() {
    return (
      <div className="ManageEmployees">
        <br></br>
        <h2>Your Employees:</h2>
        <br></br>
        <CardGroup className="employee-cards">
          {this.renderEmployees()}
        </CardGroup>
      </div>
    );
  }
}

export default ManageEmployees;