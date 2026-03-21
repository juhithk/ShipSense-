const mongoose = require("mongoose");

const DelayCodeSchema = new mongoose.Schema({
  Code: {
    type: String,
    required: true,
    unique: true,
  },
  Reason: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    enum: ["Weather", "Customs", "Port", "Carrier", "Documentation", "Other"],
    required: true,
  },
  Severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  AverageDelayHours: {
    type: Number,
    default: 0,
  },
  IsActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("DelayCode", DelayCodeSchema);