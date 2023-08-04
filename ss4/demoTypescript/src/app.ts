import express from "express";
import * as mongoose from "mongoose";
import * as shell from "shelljs";

shell.cp("-R", "src/views", "dist/views");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb://portfolio:portfolio@localhost:27018/blog_management?authSource=admin"
  )
  .then(() => {
    console.log("Connected to MongoDB");

    const app = express();

    app.listen(3000, () => console.log("Server is running on PORT: 3000"));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
