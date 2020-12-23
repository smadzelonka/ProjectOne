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
    /* Now we are on this */
    console.log("req.body email", req.body.email);
    console.log("found", foundUser.password);
    const match = await bcrypt.compare(req.body.email, foundUser.password);
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
