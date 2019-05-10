/*
        Proof of Work
      	Diego Batres & Nicholas Deckhut
        CS481a3: Blockchain Principles & Applications
        script.js
*/


/**
@param {org.pow.app.hire} Hires new employee
@transaction
**/
async function hire(hireData) {
  
  // Error checking
  if (hireData.manager.uID == hireData.employee.uID){
    throw("Error: Employee cannot be hired by themselves.")
  }
  if (hireData.manager.type == "WORKER"){
    throw("Error: Workers cannot hire other workers.")
  }
  if (hireData.manager.type == "UNEMPLOYED"){
    throw("Error: Unemployed users cannot hire people")
  }
  if (hireData.type == "MANAGER" && 
      hireData.manager.type != "ADMINISTRATOR"){
    throw("Error: Only company administrators can hire managers.")
  }
  
  let assetRegistry = await getAssetRegistry('org.pow.app.Job')
  let participantRegistry = await getParticipantRegistry('org.pow.app.User')
  // Set new employee's company and type
  hireData.employee.type = hireData.type;
  hireData.employee.company = hireData.manager.company;
  
  // Create job asset
  var factory = getFactory();
  var currentDate = new Date();
  var job = factory.newResource('org.pow.app', 'Job', hireData.jobID);
  job.jobTitle = hireData.jobTitle;
  job.location = hireData.location;
  job.description = hireData.description;
  job.type = hireData.type;
  job.startDate = currentDate;
  job.company = hireData.manager.company;
  job.manager = hireData.manager;
  job.employee = hireData.employee;
  
  // Add to registry
  await assetRegistry.add(job)
  await participantRegistry.update(hireData.employee)
  
  //return getAssetRegistry('org.pow.app.Job').then(function(registry) {
  //  return registry.add(job)
  //});
}

/**
@param {org.pow.app.terminate} Hires new employee
@transaction
**/
async function terminate(terminateData) {
  
  // Error checking
  if (terminateData.manager.type == "WORKER" || terminateData.manager.type == "UNEMPLOYED"){
    throw("Error: Workers cannot terminate other workers.")
  }
  if (terminateData.job.endDate != null){
    throw("Error: Job already terminated")
  }
  if (terminateData.manager.uID != terminateData.job.manager.uID){
    throw("Error: Managers can only terminate employees that work for them.")
  }
  if (terminateData.employee.type == "MANAGER" && terminateData.manager.type != "ADMINISTRATOR"){
    throw("Error: Only company administrators can terminate managers.")
  }
  if (terminateData.job.employee.uID != terminateData.employee.uID){
    throw("Error: Job does not belong to User")
  }
  if (terminateData.job.company.companyID != terminateData.manager.company.companyID){
    throw("Error: Admin/Manager must work for company that the Job is assosiated with")
  }
  
  
  
  let assetRegistry = await getAssetRegistry('org.pow.app.Job')
  let participantRegistry = await getParticipantRegistry('org.pow.app.User')
  // Set employee's company field to none
  terminateData.employee.company = null;
  terminateData.employee.type = "UNEMPLOYED"
  // Add end date to existing job
  job = terminateData.job;
  job.endDate = new Date();
  
  
  // Update registry
  await assetRegistry.update(terminateData.job)
  await participantRegistry.update(terminateData.employee)
}

/**
@param {org.pow.app.quit} Employee quits
@transaction
**/
async function quit(quitData) {
  if (quitData.employee != quitData.job.employee){
    throw("Error: You can only quit your own job")
  }
  if (quitData.job.endDate != null){
    throw("Error: You must be employeed at job to quit")
  }
  //sets employee's companey field to none
  let assetRegistry = await getAssetRegistry('org.pow.app.Job')
  let participantRegistry = await getParticipantRegistry('org.pow.app.User') 
  //sets employee's companey field to none
  quitData.employee.company = null;
  quitData.employee.type = "UNEMPLOYED";
  // Add end date to existing job
  quitData.job.endDate = new Date();
  await assetRegistry.update(quitData.job)
  await participantRegistry.update(quitData.employee)
  
}

/**
@param {org.pow.app.newCompany} User makes a Company
@transaction
**/
async function newCompany(companyData){

  let assetRegistry = await getAssetRegistry('org.pow.app.Job')
  let companyRegistry = await getParticipantRegistry('org.pow.app.Company')
  let userRegisty = await getParticipantRegistry('org.pow.app.User')
  var factory = getFactory();
  var currentDate = new Date();
  //make new company object
  var company = factory.newResource('org.pow.app', 'Company', companyData.companyID);
  company.name  = companyData.name;
  company.founded = currentDate;
  company.email = companyData.email;
  company.phone = companyData.phone;
  //create job for founder
  var job = factory.newResource('org.pow.app', 'Job', companyData.founderJobID);
  job.jobTitle = 'Founder';
  job.location = companyData.location;
  job.description = companyData.description;
  job.type = "ADMINISTRATOR";
  job.startDate = currentDate;
  job.company = company;
  job.manager = companyData.founder;
  job.employee = companyData.founder;
  //update founder
  companyData.founder.type = "ADMINISTRATOR";
  companyData.founder.company = company;
  // Add to registry
  
  await companyRegistry.add(company)
  await assetRegistry.add(job)
  await userRegisty.update(companyData.founder)
}


