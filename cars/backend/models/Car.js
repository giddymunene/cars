import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    car: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
