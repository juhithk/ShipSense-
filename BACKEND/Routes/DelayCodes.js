const express = require("express");
const Router = express.Router();
const DelayCode = require("../Models/DelayCode");

// GET all delay codes
Router.get("/", async (req, res) => {
  try {
    const { Category, Severity, search } = req.query;
    let filter = {};

    if (Category) filter.Category = Category;
    if (Severity) filter.Severity = Severity;
    if (search) {
      filter.$or = [
        { Code: new RegExp(search, "i") },
        { Reason: new RegExp(search, "i") },
        { Category: new RegExp(search, "i") },
      ];
    }

    const DelayCodes = await DelayCode.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: DelayCodes.length, data: DelayCodes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single delay code
Router.get("/:id", async (req, res) => {
  try {
    const delayCode = await DelayCode.findById(req.params.id);
    if (!delayCode) return res.status(404).json({ success: false, message: "Delay code not found" });
    res.json({ success: true, data: delayCode });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create delay code
Router.post("/", async (req, res) => {
  try {
    const delayCode = new DelayCode(req.body);
    await delayCode.save();
    res.status(201).json({ success: true, data: delayCode });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update delay code
Router.put("/:id", async (req, res) => {
  try {
    const delayCode = await DelayCode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!delayCode) return res.status(404).json({ success: false, message: "Delay code not found" });
    res.json({ success: true, data: delayCode });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE delay code
Router.delete("/:id", async (req, res) => {
  try {
    const delayCode = await DelayCode.findByIdAndDelete(req.params.id);
    if (!delayCode) return res.status(404).json({ success: false, message: "Delay code not found" });
    res.json({ success: true, message: "Delay code deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = Router;