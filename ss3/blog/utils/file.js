const fs = require("fs");
const path = require("path");

const readFileFromData = (pathname) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, "../data/" + pathname),
      { encoding: "utf-8" },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const writeFileFromData = (pathname, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.resolve(__dirname, "../data/" + pathname),
      data,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
};

const fileUtils = {
  readFileFromData,
  writeFileFromData,
};

module.exports = fileUtils;
