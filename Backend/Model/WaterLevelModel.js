const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const waterLevelSchema = new Schema({
  tankId: {
    type: String,
    required: true,
  },
  currentLevel: {
    type: Number, // in litters
    required: true,
  },
  maxCapacity: {
    type: Number, // in litters
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Normal",
  },
  recordedAt: {
    type: Date,
    default: Date.now,
  },
});

waterLevelSchema.virtual("percentage").get(function () {
  if (this.maxCapacity === 0) return 0;
  return ((this.currentLevel / this.maxCapacity) * 100).toFixed(2);
});

waterLevelSchema.set("toObject", { virtuals: true });
waterLevelSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("WaterLevelModel", waterLevelSchema);
