/* ==== Require ==== */
const express = require("express");
const router = express.Router();
const db = require("../models");

/* ==== Routes ==== */

// index
router.get("/", async (req, res) => {
  try {
    const allArtist = await db.Artist.find({});
    const context = { artist: allArtist };
    return res.render("artists/index", context);
  } catch (err) {
    return res.send(err);
  }
});
// new

// show
router.get("/:id", async (req, res) => {
  try {
    const foundArtist = await db.Artist.findById(req.params.id).populate(
      "artists",
    );
    const context = { artist: foundArtist };
    return res.render("artists/show", context); // adds gifts too show page "breakroom"
  } catch (err) {
    return res.send(err);
  }
});
// create --Post

// edit

// update

// Delete

/* export */
module.exports = router;
