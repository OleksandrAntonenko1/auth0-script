const axios = require("axios");

const getUserJob = async (url, authorizationHeader, jobId) => {
  try {
    const {data: job} = await axios.get(`${url}/api/v2/jobs/${jobId}`,
      {
        headers: {
          authorization: authorizationHeader
        }
      });

    console.log('pending');

    if (job.status === "pending") {
      return await getUserJob(url, authorizationHeader, jobId)
    }

    return job
  } catch (e) {
    console.log(e);
  }
};

module.exports = {getUserJob};
