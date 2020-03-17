// https://eis-live.auth0.com/api/v2/jobs/job_TKAJK8Qdd90K17Yk

const {getCredentials} = require("../constatns/live");
// const {getCredentials} = require("./constatns/credentials");
const {getUserJob} = require("../Calls/getUserJob");
const {handleJobResult} = require("../Utils/handleJobResult");

(async () => {
  const {url, authorizationHeader, connectionName} = await getCredentials();
  try {
    const {location} = await getUserJob(url, authorizationHeader, 'job_TKAJK8Qdd90K17Yk');
    console.log(`user job done`);
    const users = await handleJobResult(location);

  } catch (e) {
    console.log(e);
  }
})();
