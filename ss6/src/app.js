/**
 * Authenticate by JWT
 * 1. Login by username and password (LOCAL STRATEGY) => passport-local
 * 2. After logged in, generate new token => response token to client
 * 3. Each requests from client are sent to server, requests include token.
 *
 */

const express = require("express");
const dotenv = require("dotenv");
const connectToMongoDB = require("./configs/mongodbConnection");
const UsersModel = require("./model/userModel");
const rootRouter = require("./route");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { ExtractJwt } = require("passport-jwt");
const JwtStrategy = require('passport-jwt').Strategy;

dotenv.config();

const initRootUser = async () => {
  const username = process.env.ROOT_USERNAME;
  const password = process.env.ROOT_PASSWORD;

  if (!username || !password) {
    console.error("username or password is invalid");
    process.exit(1);
  }

  // find by username
  const oldUser = await UsersModel.findOne({ username });
  if (oldUser) {
    return;
  }
  await UsersModel.create({ username, password, roleName: 'ADMIN' });
  console.log("Created root user");
};

const mongoDbURI = process.env.MONGODB_URI;

connectToMongoDB(mongoDbURI).then(() => {
  console.log("Connected to MongoDB");

  const app = express();

  app.use(express.json()); // req.body = <data>

  app.use(passport.initialize());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      if (!username || !password) {
        return done(null, false, { message: "Invalid username or password" });
      }
      const user = await UsersModel.findOne({ username });
      if (!user) {
        return done(null, false, { message: "Username is not available" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return done(null, user); // req.user = user;
      }
      return done(null, false, { message: "Password is invalid. Try again?" });
    })
  );

  passport.use(
    new JwtStrategy({
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // Authorization: Bearer <token>
    }, async (payload, done) => {
      const user = await UsersModel.findOne({username: payload.username});
      if (!user) {
        done(null, false);
      } else {
        done(null, user); // req.user = user;
      }
    })
  )

  app.use(rootRouter);

  const PORT = process.env.PORT ?? 8080;
  app.listen(PORT, () => console.log("Server is running on port: " + PORT));

  initRootUser();
});
