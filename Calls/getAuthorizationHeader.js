const axios = require("axios");

const getAuthorizationHeader = async ({client_id, client_secret, url}) => {
  const {data: {access_token, token_type}} = await axios.post(
    `${url}/oauth/token`,
    {
    client_id,
    client_secret,
    "audience": `${url}/api/v2/`,
    "grant_type": "client_credentials"
  }, {
    headers: {'content-type': 'application/json'}
  });

  return `${token_type} ${access_token}`;
};

module.exports = { getAuthorizationHeader };
