const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../models");

// reg get
router.get("/register", function (req, res) {
  res.render("auth/register");
});

//reg post
router.post("/register", async function (req, res) {
  // check if user already exists
  // if exists -> error and send them to login
  // if not -> create a user with the given info
  // redirect to login

  try {
    // { $or: [{email: req.body.email},{username: req.body.username}]}

    const foundUser = await db.Username.findOne({ email: req.body.email });

    if (foundUser) return res.redirect("/");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    const newUser = await db.User.create(req.body);

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
  // check if the user exists
  // if the user exists
  // validate the user if passwords match -> login
  // if not match send error
  // if not
  // redirect to register

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

    res.redirect("/");
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
