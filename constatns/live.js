const url = "https://eis-live.auth0.com";
const authorizationHeader = "";
const connectionName = "pua-authentication";

const getCredentials =  () => ({connectionName, url, authorizationHeader});

module.exports = {
  getCredentials
};

