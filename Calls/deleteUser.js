const axios = require("axios");

const deleteUser = async (url, authorizationHeader, user_id) => {
  try {
    await axios.delete(`${url}/api/v2/users/${user_id}`,
      {
        headers: {
          authorization: authorizationHeader
        }
      });

    return {user_id}
  } catch (error) {
    console.log("delete failure", user_id);
    const errorMessage = error.hasOwnProperty('message')
      ? error.message
      : error;

    return {user_id, error: errorMessage}
  }
};

module.exports = {deleteUser};
