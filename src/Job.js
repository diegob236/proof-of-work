import React, { Component } from 'react'
import {Jumbotron} from 'react-bootstrap'
import './Job.css'

class Resume extends Component{
  constructor(props, job){
    super(props);
    this.state = {
      id: job.jobID,
      title: job.title,
      location: job.location,
      description: job.description,
      type: job.type,
      startDate: job.startDate,
      endDate: job.endDate,
      company: job.company,
      manager: job.manager
    }
  }



  render() {
    return (
      <Jumbotron fluid>
          <h1>{this.state.title}</h1>
      </Jumbotron>
    );
  }
}

export default Resume;