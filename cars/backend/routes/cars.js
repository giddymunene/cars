import express from "express";
import Car from "../models/Car.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all cars (public)
router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

// Add a new car (admin only)
router.post("/", authMiddleware("admin"), async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

// Edit a car (admin only)
router.put("/:id", authMiddleware("admin"), async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(car);
});

// Delete a car (admin only)
router.delete("/:id", authMiddleware("admin"), async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
});

export default router;
