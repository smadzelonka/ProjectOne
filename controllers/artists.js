/* ==== Require ==== */
const express = require("express");
const router = express.Router();
const db = require("../models");
/* imgs hope */
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
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
  db.Curator.find({}, function (err, foundCurator) {
    if (err) return res.send(err);
    const context = {
      curator: foundCurator,
    };
    res.render("artists/new", context);
  });
});

// show
router.get("/:id", async (req, res) => {
  try {
    const foundArtist = await db.Artist.findById(req.params.id).populate(
      "user",
    );
    const context = { artist: foundArtist };
    return res.render("artists/show", context);
  } catch (err) {
    return res.send(err);
  }
});
// Create

router.post("/", function (req, res) {
  db.Artist.create(req.body, function (err, createdArtist) {
    if (err) return res.send(err);
    db.Curator.findById(createdArtist.artCollection).exec(function (
      err,
      foundCurator,
    ) {
      if (err) return res.send(err);
      foundCurator.gallery.push(createdArtist); /* to where */
      foundCurator.save();
      return res.redirect("/curators/");
    });
  });
});

// edit
router.get("/:id/edit", function (req, res) {
  db.Artist.findById(req.params.id, function (err, foundArtist) {
    if (err) return res.send(err);
    const context = { artist: foundArtist };
    return res.render("artists/edit", context);
  });
});

// update
router.put("/:id", function (req, res) {
  db.Artist.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body,
      },
    },

    { new: true },
    function (err, updatedArtist) {
      if (err) return res.send(err);
      return res.redirect(`/artists/${updatedArtist._id}`);
    },
  );
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedArtist = await db.Artist.findByIdAndDelete(req.params.id);
    await db.Artist.remove({ artist: deletedArtist._id });
    return res.redirect("/artists");
  } catch (err) {
    return res.send(err);
  }
});

/* export */
module.exports = router;
