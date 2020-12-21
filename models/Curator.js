// require mongoose
const mongoose = require("mongoose");

const curatorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name Required"] },
    gallery: [{ type: mongoose.Schema.Types.ObjectId, ref: "Artists" }],
  },
  {
    timestamps: true,
  },
);
// create model with schema
const Curator = mongoose.model("Curator", curatorSchema);

// export model
module.exports = Curator;
