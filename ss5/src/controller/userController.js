const passport = require("passport");

const getLoginForm = (req, res) => {
  return res.render("login.ejs");
};

const login = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
});

module.exports = {
  getLoginForm,
  login,
};
