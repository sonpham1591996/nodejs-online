const express = require("express");
const { login } = require("../controller/userController");
const { getDashboardPage, getStudents } = require("../controller/dashboardController");
const passport = require("passport");
const auth = require("../middleware/auth");

const rootRouter = express.Router();

rootRouter.get(
  "/dashboard",
  ...auth("ADMIN", "SIMPLE_USER"),
  getDashboardPage
);

rootRouter.get(
  "/students",
  ...auth("ADMIN"),
  getStudents
);

rootRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);

module.exports = rootRouter;
