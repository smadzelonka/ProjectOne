// require mongoose
const mongoose = require("mongoose");

const curatorSchema = new mongoose.Schema(
  {
    user: { type: String, required: [true, "Name Required"] },

    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artist" }],
  },
  {
    timestamps: true,
  },
);
// create model with schema
const Curator = mongoose.model("Curator", curatorSchema);

// export model
module.exports = Curator;
