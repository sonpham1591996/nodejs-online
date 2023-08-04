const passport = require("passport");

const auth = (...roles) => {
  return [
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      const user = req.user;
      if (roles.indexOf(user.roleName) >= 0) {
        next();
      } else {
        return res.status(401).send();
      }
    },
  ];
};

module.exports = auth;
