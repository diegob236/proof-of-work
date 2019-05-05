import React, { Component } from 'react'
import Job from './Job.js'
import NavBar from './Navbar';

import './Resume.css'


// Resume: gets work experience data
class Resume extends Component{

  // Constructor
  constructor(props, jobList){
    super(props);
    this.state = {
      jobs: jobList
    }
  }

  // render(): render component
  render() {
    const jobs = this.jobs.map((job) =>
      <Job jobData={job}></Job>
    )
    return (
      <div>
        <ul>{jobs}</ul>
      </div>
    );
  }
}

export default Resume;