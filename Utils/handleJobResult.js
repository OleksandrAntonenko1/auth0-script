const readline = require('readline');
const fs = require('fs');
const axios = require('axios');
const {generateFileName} = require('../Utils/generateFileName');
const zlib = require('zlib');
const stream = require('stream');
const util = require('util');

async function processResultFile(filename, checker = () => true) {
  return new Promise((resolve, reject) => {
    let stream = fs.createReadStream(filename);
    const users = [];

    let rl = readline.createInterface({
      input: stream
    });

    rl.on('line', (line) => {
      const user = JSON.parse(line);

      if (checker(user)) {
        users.push(user)
      }
    }).on('close', () => {
      console.log(`there are - ${users.length} users to process`);

      resolve(users);
    }).on('error', err => {
      reject(err);
    })

  });
}

const handleJobResult = async (location) => {
  const pipeline = util.promisify(stream.pipeline);
  const jobResultFileName = generateFileName('jobResult');
  const output = fs.createWriteStream(jobResultFileName);
  const {data: responseData} = await axios.get(location, {responseType: 'stream'});
  const gunzip = zlib.createGunzip();

  await pipeline(responseData, gunzip, output);
  return await processResultFile(jobResultFileName, (user) => user.hasOwnProperty('app_metadata'))
};


module.exports = {handleJobResult, processResultFile};
