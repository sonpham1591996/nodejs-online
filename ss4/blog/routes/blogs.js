const express = require("express");
const qs = require("querystring");
const blogsControllers = require("../controllers/blogsController");
const { validatorForWebServer } = require("../middlewares/joi-validators");
const {
  expressValidatorForWebServer,
} = require("../middlewares/express-validators");

const blogsRouter = express.Router();

// /blogs/list
blogsRouter.get("/list", blogsControllers.getListBlogs);

// /blogs/:id/detail
blogsRouter.get("/:id/detail", blogsControllers.getBlogDetail);

blogsRouter.get("/creation-form", blogsControllers.getCreationForm);

blogsRouter.get("/:id/update-form", blogsControllers.getUpdateForm);

blogsRouter.get("/:id/delete", blogsControllers.deleteBlog);

//  OPTION 1: Use express validator
// blogsRouter.post(
//   "",
//   expressValidatorForWebServer("blogDTO", "blogs/creationForm.ejs"),
//   blogsControllers.createBlog
// );

// // OPTION 2: Use Joi to validate
blogsRouter.post(
  "/create",
  // validatorForWebServer("blogDTO", "blogs/creationForm.ejs"),
  blogsControllers.createBlog
);

blogsRouter.post(
  "/update",
  // validatorForWebServer("blogDTO", "blogs/creationForm.ejs"),
  blogsControllers.updateBlog
);

module.exports = blogsRouter;
