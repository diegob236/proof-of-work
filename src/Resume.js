import React, { Component } from 'react'
import './Resume.css'
import NavBar from './Navbar';
import Job from './Job.js'


//resuires uID data
class Resume extends Component{
  constructor(props, jobList){
    super(props);
    this.state = {
      jobs: jobList
    }
  }



  render() {
    const jobs = this.jobs.map((job) =>
      <Job jobData={job}></Job>
    )
    return (
      <div>
        <NavBar></NavBar>
        <ul>{jobs}</ul>
      </div>
    );
  }
}



export default Resume;