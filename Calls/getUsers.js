const axios = require("axios");
const getUsers = async (url, authorizationHeader, query, params = {}) => {
  const urlQueryPart = query
    ? `?q=${query}`
    : '';

  try {
    return await axios.get(`${url}/api/v2/users${urlQueryPart}`, {
      params,
      headers: {
        authorization: authorizationHeader
      }
    })
  } catch (e) {
    throw new Error(e)
  }
};

module.exports = {getUsers};
