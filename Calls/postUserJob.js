const axios = require("axios");

const postUserJob = async (url, authorizationHeader, connection_id) => {
  try {
    const {data} = await axios.post(`${url}/api/v2/jobs/users-exports`,
      {
        connection_id,
        "format": "json",
        "limit": 100000,
        "fields": [
          {
            "name": "user_id"
          },
          {
            "name": "app_metadata"
          },
        ]
      },
      {
        headers: {
          authorization: authorizationHeader
        }
      });

    return data;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {postUserJob};
