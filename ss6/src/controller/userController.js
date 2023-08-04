const jwt = require("jsonwebtoken");

const getLoginForm = (req, res) => {
  return res.render("login.ejs");
};

const login = (req, res) => {
  // if (!err) {
  //   return res.status(400).json({ message: "Login failed" });
  // }
  const user = req.user;
  // Generate token
  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRED_IN,
  });
  return res.status(200).json({ token });
};

module.exports = {
  getLoginForm,
  login,
};
