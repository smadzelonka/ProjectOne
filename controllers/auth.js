const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");
/* google */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20"); /* .Strategy */
const { Username } = require("../models");

require("dotenv").config();
/* 
Help with google and passport was threw ....
https://www.youtube.com/watch?v=5VHBy2PjxKs&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=18&ab_channel=TheNetNinja
net ninja youtube, google docs and passport docs 
*/

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.Username.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL:
        "https://localartwork.herokuapp.com/auth/google/artshow" ||
        "http://localhost:4001/auth/google/artshow",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    (accessToken, refreshToken, profile, done) => {
      db.Username.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("user is ", currentUser);
          done(null, currentUser);
        } else {
          // console.log(profile);
          new db.Username({
            username: profile.displayName,
            googleId: profile.id,
            email: profile.emails[0].value,
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
      "openid profile email https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    ],
    /* added a bunch of scopes because i want everything
    
     */
  }),
);

// GET /auth/google/callback
router.get(
  "/auth/google/artshow",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    /* console.log(req.user.username); */
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
