// external modules
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { OAuth2Client } = require("google-auth-library");
const passport = require("passport");

// internal modules
const controllers = require("./controllers");
const { Username } = require("./models");
const { db } = require("./models/Auth");

// instanced modules
const app = express();
require("dotenv").config();

// Configuration
const PORT = process.env.PORT; /* || 4001 */

app.set("view engine", "ejs");

/* ===== Middleware =====*/
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session
app.use(
  session({
    store: new MongoStore({
      url: process.env.MONGODB_URI,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// logger
app.use(function (req, res, next) {
  req.session.test = "Test Property";
  // console.log(req.session);
  next();
});

// user authentication middleware
app.use(function (req, res, next) {
  app.locals.user = req.session.currentUser;
  next();
});

const authRequired = (req, res, next) => {
  if (req.session.currentUser || req.user) {
    next();
  } else {
    console.log("authrequired");
    res.redirect("/");
  }
};

// Routes/controllers
// home
app.get("/", function (req, res) {
  const context = { user: req.session.currentUser, userAuth: req.user };
  res.render("home", context);
});

// Auth controller
app.use("/", controllers.auth);
// artist controller
app.use("/artists", authRequired, controllers.artists);
// curator controller
app.use("/curators", authRequired, controllers.curators);

// Listener
app.listen(PORT, function () {
  console.log(`Curate is live at http://localhost:${PORT}/`);
});
