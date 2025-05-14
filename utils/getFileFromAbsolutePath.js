const path = require("path");

const getFileFromAbsolutePath = (relativePath) => {
  return path.resolve(__dirname, "..", relativePath);
};

module.exports = getFileFromAbsolutePath;