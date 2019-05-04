import React, { Component } from 'react'
import './Resume.css'
import NavBar from './Navbar';


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
      <li key={job.startDate}>
        {job.title}
      </li>
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