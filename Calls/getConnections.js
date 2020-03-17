const axios = require("axios");

const getConnections = async (url, authorizationHeader) => {
  try {
    const {data: connections} = await axios.get(`${url}/api/v2/connections`,
      {
        headers: {
          authorization: authorizationHeader
        }
      });

    return connections;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getConnections
};
