const express = require("express");
const Router = express.Router();
const Shipment = require("../Models/Shipment");

// GET all shipments
Router.get("/", async (req, res) => {
  try {
    const { Status, Supplier, search } = req.query;
    let filter = {};

    if (Status) filter.Status = Status;
    if (Supplier) filter.Supplier = new RegExp(Supplier, "i");
    if (search) {
      filter.$or = [
        { ShipmentId: new RegExp(search, "i") },
        { Supplier: new RegExp(search, "i") },
        { Origin: new RegExp(search, "i") },
        { Destination: new RegExp(search, "i") },
      ];
    }

    const Shipments = await Shipment.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: Shipments.length, data: Shipments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single shipment
Router.get("/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ ShipmentId: req.params.id });
    if (!shipment) return res.status(404).json({ success: false, message: "Shipment not found" });
    res.json({ success: true, data: shipment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST create shipment
Router.post("/", async (req, res) => {
  try {
    const count = await Shipment.countDocuments();
    const ShipmentId = `SHP-${String(count + 1).padStart(4, "0")}`;

    const shipment = new Shipment({ ...req.body, ShipmentId });
    await shipment.save();
    res.status(201).json({ success: true, data: shipment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update shipment
Router.put("/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findOneAndUpdate(
      { ShipmentId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!shipment) return res.status(404).json({ success: false, message: "Shipment not found" });
    res.json({ success: true, data: shipment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE shipment
Router.delete("/:id", async (req, res) => {
  try {
    const shipment = await Shipment.findOneAndDelete({ ShipmentId: req.params.id });
    if (!shipment) return res.status(404).json({ success: false, message: "Shipment not found" });
    res.json({ success: true, message: "Shipment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = Router;