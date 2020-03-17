const findConnectionByName = (connections, connectionName) => {
  return connections.find(({name}) => name === connectionName)
};

module.exports = {findConnectionByName};
