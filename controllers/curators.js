/* ==== Require ==== */
const express = require("express");
const router = express.Router();
const db = require("../models");

/* ==== Routes ==== */

// Index
router.get("/", function (req, res) {
  // mongoose
  db.Curator.find({}, function (err, allCurators) {
    if (err) return res.send(err);
    const context = { curators: allCurators };
    return res.render("curators/index", context);
  });
});

// New
router.get("/new", function (req, res) {
  res.render("curators/new");
});

// Show
router.get("/:id", function (req, res) {
  db.Curator.findById(req.params.id)
    .populate("gallery")
    .exec(function (err, foundCurator) {
      if (err) return res.send(err);

      const context = { curators: foundCurator };
      return res.render("curators/show", context);
    });
});

// Create
router.post("/", async function (req, res) {
  try {
    await db.Curator.create(req.body);
    return res.redirect("/curators");
  } catch (err) {
    return res.send(err);
  }
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
router.delete("/:id", async function (req, res) {
  try {
    const deletedCurator = await db.Curator.findByIdAndDelete(req.params.id);
    await db.Curator.remove({ curator: deletedCurator._id });
    return res.redirect("/curators");
  } catch (err) {
    return res.send(err);
  }
});

/* export */
module.exports = router;
