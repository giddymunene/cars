import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const Car = mongoose.model("Car", carSchema);

export default Car;
