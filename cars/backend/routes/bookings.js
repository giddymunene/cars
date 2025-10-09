// backend/routes/bookings.js
import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

router.delete("/:id", async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking deleted" });
});

export default router;
