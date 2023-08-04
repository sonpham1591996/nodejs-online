const express = require("express");
const blogsRouter = require("./blogs");
const blogAPIsRouter = require("./api/blogs");
const handleNotFoundPage = require("../middlewares/404");

const rootRouter = express.Router();

rootRouter.get("", (req, res) => {
  return res.render("home.ejs");
});
rootRouter.use("/blogs", blogsRouter);

rootRouter.use("/api/blogs", blogAPIsRouter);

rootRouter.use("**", handleNotFoundPage);

module.exports = rootRouter;
