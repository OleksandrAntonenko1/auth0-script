const generateFileName = (filename) => {
  const date = new Date();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return`files/${filename}-${day}d-${hour}h-${minutes}m-${seconds}s.json`;
};

module.exports = {generateFileName};
