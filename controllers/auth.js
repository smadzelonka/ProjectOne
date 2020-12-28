const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");
/* google */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20"); /* .Strategy */
const { Username } = require("../models");

require("dotenv").config();
/* net ninja youtube, google docs and passport docs */

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.Username.findById(id).then((user) => {
    done(null, user.id);
  });
});
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "http://localhost:4001/auth/google/artshow",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      db.Username.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("user is ", currentUser);
          done(null, currentUser);
        } else {
          new db.Username({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.email,
          })
            .save()
            .then((newUser) => {
              console.log("new user created" + newUser);
              done(null, newUser);
            });
        }
      });
    },
  ),
);

// GET /auth/google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  }),
);

// GET /auth/google/callback
router.get(
  "/auth/google/artshow",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // res.send(req.user);
    res.redirect("/");
  },
);

/* ============================================= */

// reg get
router.get("/register", function (req, res) {
  res.render("auth/register");
});

//reg post
router.post("/register", async function (req, res) {
  try {
    const foundUser = await db.Username.findOne({ email: req.body.email });
    if (foundUser) return res.redirect("/");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const newUser = await db.Username.create(req.body);
    return res.redirect("/");
  } catch (err) {
    return res.send(err);
  }
});

// log get
router.get("/", function (req, res) {
  res.render("/");
});

// log post
router.post("/", async function (req, res) {
  try {
    const foundUser = await db.Username.findOne({ email: req.body.email });
    if (!foundUser) return res.redirect("/register");
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (!match) return res.send("Password or Email Invalid");

    // create our user on the session
    req.session.currentUser = {
      id: foundUser._id,
      username: foundUser.username,
    };

    res.redirect("/curators");
  } catch (err) {
    return res.send(err);
  }
});

// /logout - DELETE - destroy the active session

router.delete("/logout", async function (req, res) {
  await req.session.destroy();
  res.redirect("/");
});

module.exports = router;
