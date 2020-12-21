// require mongoose
const mongoose = require("mongoose");

/* schema */
const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    url: { type: String, required: true },
    artwork: { data: Buffer, contentType: String } /* Img url? */,
    gallery: { type: mongoose.Schema.Types.ObjectId, ref: "Curator" },
  },
  { timestamps: true },
);

/*  model */
const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
