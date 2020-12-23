const mongoose = require("mongoose");

const usernameSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true /* minlength: 8 */ },
  },
  { timestamps: true },
);

const Username = mongoose.model("Username", usernameSchema);

module.exports = Username;
