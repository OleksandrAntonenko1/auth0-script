const {processResultFile} = require("../Utils/handleJobResult");
const {postUpdateUser} = require("../Calls/postUpdateUser");
const {getCredentials} = require("../constatns/credentials");

const main = async () => {
  try {
    const {url, authorizationHeader} = await getCredentials();
    const users = await processResultFile('./files/jobResult-16d-13h-59m-40s.json');

    console.log(users.length);

    for (const {user_id} of users) {
      const result = await postUpdateUser(url, authorizationHeader, user_id, {app_metadata: {test: "test"}});
      console.log(result);
    }

  } catch (e) {
    console.log(e);
  }
};

main();

