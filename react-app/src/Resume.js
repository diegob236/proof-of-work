import React, { Component } from 'react';
import {Button} from'react-bootstrap'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

import store from './redux/store';

import './Resume.css'

const axios = require('axios');
const uuidv3 = require('uuid/v3');


// Resume: gets work experience data
class Resume extends Component{

  // Constructor
  constructor(props){
    super(props);
    this.state = {
      jobList : [],
      companyList: []
    };
    this.getResume = this.getResume.bind(this);
    this.renderJobs = this.renderJobs.bind(this);
    this.populateJobData = this.populateJobData.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
  }

  // componentDidMount(): send GET request to get data
  async componentDidMount() {
    await this.getResume();
  }

  // getResume(): query server for your work experience
  getResume() {
    console.log(store.getState().email)
    var uId = uuidv3(store.getState().email, uuidv3.URL);
    axios({
      method: 'get',
      url: 'http://157.230.172.148:3000/api/queries/workExperience?uIDParam=resource%3Aorg.pow.app.User%23'+uId
    })
    .then((response) => {
      console.log(response.data);
      this.populateJobData(response.data);
      this.setState({
        jobList: response.data
      }); 
    })
    .catch((error) => {
      console.log(error);
      console.log('No jobs found for ' + store.getState().email);
    })
  }

  // handleQuit(): submit request to quit job
  handleQuit = event =>{
    let job = event.target.value;
    console.log(job)
    let quitData = {
      $class: "org.pow.app.quit",
      job: job,
      employee: 'resource:org.pow.app.User#' + uuidv3(store.getState().email, uuidv3.URL)
    }
    console.log(quitData)
    axios({
      method: 'post',
      url: 'http://157.230.172.148:3000/api/quit',
      data: quitData
    })
    .then((response) => {
      console.log(response.data);
      this.populateJobData(response.data);
      this.setState({
        jobList: response.data
      }); 
    })
    .catch((error) => {
      console.log(error);
      console.log('No jobs found for ' + store.getState().email);
    })
    this.props.history.push("/dashboard");
  }

  // populateJobData(): populates job and company data
  async populateJobData(data){
    let jobs = []
    let companies = []
    for (let i = 0; i < data.length; i++){
      companies.push(data[i].company);
      jobs.push(data[i]);
    }
    await this.setState({
      jobList: jobs,
      companyList: companies
    });
  }

  // renderJobs(): renders jobs organized in card format
  renderJobs() {
    let jobs = []
    jobs.push()
    for (let i = 0; i < this.state.jobList.length; i++){
      let job = this.state.jobList[i]
      let company = this.state.companyList[i]
      jobs.push(
        <div key={job.startDate} as="li">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{job.jobTitle}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{job.type + ' at '+company.name}</Card.Subtitle>
              <Card.Text>
                {job.description}
              </Card.Text>
              <Card.Text>
                Start Date: {job.startDate.split('T')[0]}
              </Card.Text>
              <Card.Text>
                End Date: {typeof(job.endDate) === 'undefined' ?  'Current' : job.startDate.split('T')[0]}
              </Card.Text>
              {typeof(job.endDate) !== 'undefined' ?  '' : 
              <Button variant="danger" value={job.jobID} onClick={this.handleQuit}>Quit</Button>}
            </Card.Body>
          </Card>
        </div>
      )
    }
    return jobs;
  }

  // render(): render component
  render() {
    return (
      <div key="Resume">
        <div key="header">
          <br></br>
          <h2>Verified Resume:</h2>
          <br></br>
        </div>
        <CardGroup className="resume-cards">
          {this.renderJobs()}
        </CardGroup>
      </div>  
    );
  }
}

export default Resume;