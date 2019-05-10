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
  if (hireData.manager.type == "WORKER"){
    throw("Error: Workers cannot hire other workers.")
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
  job.jobID = hireData.jobID;
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


// updateUserType(): update type and company
async function updateUserHire(user, type, company) {
  	user.type = type;
  	user.company = company;
	return getParticipantRegistry('org.pow.app.User').then(function(registry) {
    	return registry.update(user)
  	});
}


/**
@param {org.pow.app.terminate} Hires new employee
@transaction
**/
function terminate(terminateData) {

  // Error checking
  if (terminateData.manager.type == "WORKER"){
    throw("Error: Workers cannot terminate other workers.")
  }
  if (terminateData.manager.uID != terminateData.job.manager.uID){
    throw("Error: Managers can only terminate employees that work for them.")
  }
  if (terminateData.employee.type == "MANAGER" && 
      terminateData.manager.type != "ADMINISTRATOR"){
    throw("Error: Only company administrators can terminate managers.")
  }

  // Set employee's company field to none
  terminateData.employee.company = none;

  // Add end date to existing job
  job = terminateData.job;
  job.endDate = new Date();

  // Update registry
  return getAssetRegistry('org.pow.app.Job').then(function(registry) {
    return registry.update(job)
  });
}
