const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  position: String,

  email: {
    type: String,
    required: true,
    unique: true,
  },

  phone: String,
  password: {
    type: String,
    default: "staff",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Staff", staffSchema);
