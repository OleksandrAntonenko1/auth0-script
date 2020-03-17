const {getCredentials} = require("./constatns/live");
// const {getCredentials} = require("./constatns/credentials");
const {getConnections} = require("./Calls/getConnections");
const {postUserJob} = require("./Calls/postUserJob");
const {getUserJob} = require("./Calls/getUserJob");
const {findConnectionByName} = require("./Utils/findConnectionByName");
const {handleJobResult} = require("./Utils/handleJobResult");
const {deleteUser} = require("./Calls/deleteUser");
const {saveToFile} = require("./Utils/saveToFile");
const {generateFileName} = require("./Utils/generateFileName");

const getChunk = (arr, chunkLength = 5) => {
  const chunk = [];
  for (let i = 0; i < chunkLength; i++) {
    if (!arr.length) {
      break
    }

    chunk.push(arr.pop())
  }

  return chunk;
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const {url, authorizationHeader, connectionName} = await getCredentials();
  try {
    const connections = await getConnections(url, authorizationHeader);
    console.log(`there are - ${connections.length} connections`);
    const {id: connectionId} = findConnectionByName(connections, connectionName);
    console.log(`connection found - ${connectionId}`);
    const {id: userJobId} = await postUserJob(url, authorizationHeader, connectionId);
    console.log(`user job created`);
    const {location} = await getUserJob(url, authorizationHeader, userJobId);
    console.log(`user job done`);
    const users = await handleJobResult(location);

    return ;

    // const startTime = new Date();
    // const fileName = generateFileName('errorFile');
    // console.log(`there are ${users.length / 5} chunks `);
    // let index = 1;
    //
    // while (users.length) {
    //   const userChunk = getChunk(users);
    //   const userPromises = userChunk.map(({user_id}) => deleteUser(url, authorizationHeader, user_id));
    //   const result = await Promise.all(userPromises);
    //   console.log(result);
    //   // await timeout(1500);
    //   const errors = result.filter(({error}) => error);
    //   console.log(`chunk - ${index++}`);
    //   if (errors.length) {
    //     saveToFile(errors, fileName);
    //     console.log(errors);
    //   }
    // }
    //
    // const endTime = new Date();
    // const secondsPassed = (endTime - startTime) / 1000;
    // console.log(`passed: ${secondsPassed} seconds`);
    // console.log(`passed: ${secondsPassed / 60} minutes`);

  } catch (e) {
    console.log(e);
  }
})();
