import React, { Component } from 'react';
import {ListGroup} from'react-bootstrap'
import Card from 'react-bootstrap/Card'

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
    this.getCompanyData = this.getCompanyData.bind(this);
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

  async getCompanyData(companyID){
    var join = "Error"
    axios({
      method: 'get',
      url: 'http://157.230.172.148:3000/api/Company/'+companyID
    })
    .then((response) => {
      console.log(response.data);
      join = this.state.companyList.concat(response.data) 
    })
    .catch((error) => {
      console.log(error);
      alert('No jobs found for ' + store.getState().email);
    });
    await this.setState({
      companyList: join
    });
  }

  async populateJobData(data){
    let jobs = []
    for (let i = 0; i < data.length; i++){
      console.log(data[i].company.companyID);
      this.getCompanyData(data[i].company.companyID);
      jobs.push(data[i]);
    }
    await this.setState({jobList: jobs});
  }

  renderJobs() {
    console.log(this.state.jobList)
    let jobs = []
    jobs.push(<h1>Verified Resume</h1>)
    for (let i = 0; i < this.state.jobList.length; i++){
      let job = this.state.jobList[i]
      jobs.push(
        <div key={job.startDate} as="li">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
              <Card.Text>
                here
              </Card.Text>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
          <h3>{job.jobTitle}</h3>
        </div>
      )
    }
    return <ListGroup as="ul">{jobs}</ListGroup>
  }

  // render(): render component
  render() {
    console.log(this.state.jobList)
    return (
      <div>
          {this.renderJobs()}
      </div>
    );
  }
}

export default Resume;