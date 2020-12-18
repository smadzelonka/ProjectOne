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
// show
router.get("/:id", async (req, res) => {
  try {
    const foundArtist = await db.Artist.findById(req.params.id).populate(
      "artists",
    );
    const context = { gift: foundArtist };
    return res.render("artists/show", context); // adds gifts too show page "breakroom"
  } catch (err) {
    return res.send(err);
  }
});

/* export */
module.exports = router;
