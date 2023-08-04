const express = require("express");
const fs = require("fs");
// ============ Use morgan to write logs ============= //
const morgan = require("morgan");
const path = require("path");

const app = express();
// ============ Use morgan to write logs ============= //
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

// ============ Use morgan to write logs ============= //

app.get("/", (req, res) => {
  throw new Error("ERROR");
});

app.get("/file-content", async (req, res, next) => {
  try {
    const readFile = () =>
      new Promise((resolve, reject) => {
        fs.readFile("/file-does-not-exist", (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    const data = await readFile();
    res.send(data);
  } catch (err) {
    next(err); // Pass errors to Express.
  }
});

// ============ Errors handling ============= //
app.use((err, req, res, next) => {
  console.error(err);
  if (err) {
    return res.status(400).send();
  }
  next();
});

app.listen(3000, () => console.log("Server is running on port 3000"));
