/* ==== Require ==== */
const express = require("express");
const router = express.Router();
const db = require("../models");

/* ==== Routes ==== */

// Index
router.get("/", function(req,res){
    // mongoose
    db.Artist.find({}, function(err, allAuthors){
  
      if(err) return res.send(err);
  
      const context = {artists: allArtists}
      return res.render("artists/index", context);
  
    });
  
  });

// New
router.get("/new", function(req,res){
    res.render("artist/new");
  });

// Show
router.get("/:id", function(req,res){

    db.Artist
    .findById(req.params.id)
    .populate("artists")
    .exec(function (err, foundAuthor) {
      if (err) return res.send(err);
      
      const context = { artist: foundArtist };
      return res.render("artists/show", context);
    })
  
  });

// Create
router.post("/", function(req,res){
    db.Artist.create(req.body, function (err, createdArtist) {
  
      if (err) return res.send(err);
      
      return res.redirect("/artists");
      
    });
  });

// Edit
router.get("/:id/edit", function(req, res){
    db.Artist.findById(req.params.id, function(err, foudArtist){
        if (err) return res.send(err);

        const context ={artist: foundArtist};
        return res.render("artists/edit", context);
    });
});

// Update
router.put("/:id", function(req,res){
    db.Artist.findByIdAndUpdate(
        req.params.id,
    {
        $set:{
            ...req.body
        },
    },

    {new:true},
    function (err, updatedArtist){
        if (err) return res.send(err);
        return res.redirect(`/artists/${updatedArtist._id}`);
    }
    );
});

// Delete
router.delete("/:id", function(req,res){
    db.Artist.findByIdAndDelete(req.params.id, function (err, deletedArtists) {
      if (err) return res.send(err);
  
      db.Artist.remove({author: deletedArtist._id}, function(err, deletedArtists){
        if (err) return res.send(err);
        return res.redirect("/artists");
      });
      
    });
  });

/* export */
module.exports = router;
