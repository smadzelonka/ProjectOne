// require mongoose
const mongoose = require("mongoose");

/* schema */
const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true, maxlength: 40 },
    url: { type: String, required: true },
    artwork: {
      type: String /* data: Buffer, contentType: String */,
    } /* data: Buffer, contentType: String */ /* Img url? */,
    artCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curator",
    },
  },
  { timestamps: true },
);

/*  model */
const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
