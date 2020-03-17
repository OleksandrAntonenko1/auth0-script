const {getAuthorizationHeader} = require("../Calls/getAuthorizationHeader");
const {getUsers} = require("../Calls/getUsers");
const {url, client_id, client_secret} = require("../constatns/credentials");

const main = async () => {
  try {
    const authorizationHeader = await getAuthorizationHeader({client_id, client_secret, url});
    const {data: users} = await getUsers(url, authorizationHeader, '', {
      per_page: 100,
      page: 0
    });

    const result = users.map(({user_id, app_metadata, identities, username}) => [user_id, username]);
    console.log(result);
    console.log(result.length);
  } catch (e) {
    console.log(e);
  }
};

main();
