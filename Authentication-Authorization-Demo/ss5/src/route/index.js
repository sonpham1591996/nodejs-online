const express = require("express");
const { getLoginForm, login } = require("../controller/userController");
const { getDashboardPage } = require("../controller/dashboardController");

const rootRouter = express.Router();

rootRouter.get("/login", getLoginForm);

rootRouter.get(
  "/dashboard",
  (req, res, next) => {
    // TODO extract to middleware folder
    if (req.isAuthenticated()) {
      next();
    } else {
      return res
        .writeHead(302, {
          Location: "/login",
        })
        .end();
    }
  },
  getDashboardPage
);

rootRouter.post("/login", login);

module.exports = rootRouter;
