const express = require("express");
const Router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

// GET all users
Router.get("/", async (req, res) => {
  try {
    const { Role, search, IsActive } = req.query;
    let filter = {};

    if (Role) filter.Role = Role;
    // Fix: IsActive filter was missing before
    if (IsActive !== undefined) filter.IsActive = IsActive === "true";
    if (search) {
      filter.$or = [
        { Name: new RegExp(search, "i") },
        { Email: new RegExp(search, "i") },
        { Company: new RegExp(search, "i") },
      ];
    }

    const Users = await User.find(filter).select("-Password").sort({ createdAt: -1 });
    res.json({ success: true, count: Users.length, data: Users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single user
Router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-Password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create user
Router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save(); // pre-save hook handles hashing
    const userObj = user.toObject();
    delete userObj.Password;
    res.status(201).json({ success: true, data: userObj });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update user
Router.put("/:id", async (req, res) => {
  try {
    const updates = { ...req.body };

    // If password is being updated, hash it manually
    // (findByIdAndUpdate bypasses pre-save hook)
    if (updates.Password) {
      updates.Password = await bcrypt.hash(updates.Password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select("-Password");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE user
Router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = Router;