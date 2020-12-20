/* ==== Require ==== */
const express = require("express");
const router = express.Router();
const db = require("../models");

/* ==== Routes ==== */

// index
router.get("/", async (req, res) => {
  try {
    const allArtists = await db.Artist.find({});
    const context = { artists: allArtists };
    return res.render("artists/index", context);
  } catch (err) {
    return res.send(err);
  }
});
// new
router.get("/new", (req, res) => {
  db.Artist.find({}, function (err, foundArtist) {
    if (err) return res.send(err);

    const context = {
      artist: foundArtist,
    };
    res.render("artists/new", context);
  });
});

// show
router.get("/:id", async (req, res) => {
  try {
    const foundArtist = await db.Artist.findById(req.params.id).populate(
      "artists",
    );
    const context = { artist: foundArtist };
    return res.render("artists/show", context); 
  } catch (err) {
    return res.send(err);
  }
});
// Create
router.post("/", async (req, res) => {
  try {
    await db.Artist.create(req.body);
    return res.redirect("/artists");
  } catch (err) {
    return res.send(err);
  }
});
// edit
router.get("/:id/edit", function (req, res) {
  db.Artist.findById(req.params.id, function (err, foundArtist) {
    if (err) return res.send(err);

    const context = { curator: foundArtist };
    return res.render("artists/edit", context);
  });
});

// update

// Delete

/* export */
module.exports = router;
