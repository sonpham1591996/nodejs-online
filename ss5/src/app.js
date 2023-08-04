const express = require("express");
const dotenv = require("dotenv");
const connectToMongoDB = require("./configs/mongodbConnection");
const UsersModel = require("./model/userModel");
const rootRouter = require("./route");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

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
  await UsersModel.create({ username, password });
  console.log("Created root user");
};

const mongoDbURI = process.env.MONGODB_URI;
connectToMongoDB(mongoDbURI).then(() => {
  console.log("Connected to MongoDB");

  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.resolve(__dirname, "views"));

  app.use(express.urlencoded({ extended: false }));

  // setup session
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  );

  // init passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Init LocalStrategy

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
        return done(null, user);
      }
      return done(null, false, { message: "Password is invalid. Try again?" });
    })
  );

  // Serialize and deserialize user for session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UsersModel.findById(id);
    done(null, user);
  });

  app.use(rootRouter);

  const PORT = process.env.PORT ?? 8080;
  app.listen(PORT, () => console.log("Server is running on port: " + PORT));

  initRootUser();
});
