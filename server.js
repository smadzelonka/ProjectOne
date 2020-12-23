// external modules
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// internal modules
const controllers = require("./controllers");

// instanced modules
const app = express();
require("dotenv").config();

// Configuration
const PORT = process.env.PORT; /* || 4001; */

app.set("view engine", "ejs");

/* ===== Middleware =====*/
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Session
app.use(
  session({
    store: new MongoStore({
      url: "mongodb://localhost:27017/curate",
    }),
    secret: "what what in the what",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2, // two weeks
    },
  }),
);

// logger
app.use(function (req, res, next) {
  req.session.test = "Test Property";
  console.log(req.session);
  next();
});

// user authentication middleware
app.use(function (req, res, next) {
  app.locals.user = req.session.currentUser;
  next();
});

const authRequired = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/");
  }
};

// Routes/controllers
// home
app.get("/", function (req, res) {
  res.render("home");
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
