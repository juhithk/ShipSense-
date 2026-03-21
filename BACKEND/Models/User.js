const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Role: { type: String, enum: ["admin", "supplier", "customer"], default: "customer" },
  Company: { type: String, default: null },
  IsActive: { type: Boolean, default: true },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
}, { timestamps: true });

UserSchema.pre("save", async function () {
  if (!this.isModified("Password")) return;
  this.Password = await bcrypt.hash(this.Password, 10);
});

mongoose.deleteModel(/User/);
module.exports = mongoose.model("User", UserSchema);