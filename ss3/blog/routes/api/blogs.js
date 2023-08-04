const express = require("express");
const restBlogsControllers = require("../../controllers/restBlogsController");
const {
  expressValidatorForWebService,
} = require("../../middlewares/express-validators");
const { validatorForWebService } = require("../../middlewares/joi-validators");

const blogAPIsRouter = express.Router();

blogAPIsRouter.get("", restBlogsControllers.getListBlogs);

//  OPTION 1: Use express validator
blogAPIsRouter.post(
  "",
  expressValidatorForWebService("blogDTO"),
  restBlogsControllers.createBlog
);

// OPTION 2: Use Joi to validate
// blogAPIsRouter.post('', validatorForWebService('blogDTO'), restBlogsControllers.createBlog);

module.exports = blogAPIsRouter;
