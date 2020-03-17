const fs = require("fs");

const saveToFile = (users, fileName) => {
  const jsonContent = users.map(user => JSON.stringify(user)).join('\n') + '\n';

  fs.appendFile(fileName, jsonContent, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
};

module.exports = {saveToFile};
