const axios = require("axios");

const postUpdateUser = async (url, authorizationHeader, user_id, data) => {
  try {
    const {data: updatedUser} = await axios.patch(`${url}/api/v2/users/${user_id}`, data,
      {
        headers: {
          authorization: authorizationHeader
        }
      });

    if (updatedUser.hasOwnProperty('app_metadata')) {
      return {error: 'user has app_metadata', ...updatedUser};
    }

    return updatedUser;
  } catch (error) {
    console.log("update failure", user_id);
    const errorMessage = error.hasOwnProperty('message')
      ? error.message
      : error;

    return {user_id, error: errorMessage}
  }
};

module.exports = {postUpdateUser: postUpdateUser};
