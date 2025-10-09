// backend/models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  startDate: String,
  endDate: String,
  carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car" },
});

export default mongoose.model("Booking", bookingSchema);
