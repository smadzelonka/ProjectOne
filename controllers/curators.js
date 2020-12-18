/* ==== Require ==== */
const express = require("express");
const router = express.Router();
const db = require("../models");

/* ==== Routes ==== */

// Index
router.get("/", function (req, res) {
  // mongoose
  db.Curator.find({}, function (err, allCurator) {
    if (err) return res.send(err);

    const context = { Curators: allCurators };
    return res.render("Curators/index", context);
  });
});

// New
router.get("/new", function (req, res) {
  res.render("Curator/new");
});

// Show
router.get("/:id", function (req, res) {
  db.Curator.findById(req.params.id)
    .populate("Curators")
    .exec(function (err, foundAuthor) {
      if (err) return res.send(err);

      const context = { curator: foundCurator };
      return res.render("Curators/show", context);
    });
});

// Create
router.post("/", function (req, res) {
  db.Curator.create(req.body, function (err, createdCurator) {
    if (err) return res.send(err);

    return res.redirect("/curators");
  });
});

// Edit
router.get("/:id/edit", function (req, res) {
  db.Curator.findById(req.params.id, function (err, foundCurator) {
    if (err) return res.send(err);

    const context = { curator: foundCurator };
    return res.render("curators/edit", context);
  });
});

// Update
router.put("/:id", function (req, res) {
  db.Curator.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        ...req.body,
      },
    },

    { new: true },
    function (err, updatedCurator) {
      if (err) return res.send(err);
      return res.redirect(`/curators/${updatedCurator._id}`);
    },
  );
});

// Delete
router.delete("/:id", function (req, res) {
  db.Curator.findByIdAndDelete(req.params.id, function (err, deletedCurator) {
    if (err) return res.send(err);

    db.Curator.remove(
      { author: deletedCurator._id },
      function (err, deletedCurators) {
        if (err) return res.send(err);
        return res.redirect("/authors");
      },
    );
  });
});

/* export */
module.exports = router;
