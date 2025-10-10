import express from "express";
import multer from "multer";
import Car from "../models/Car.js";

const router = express.Router();

// Setup multer for memory storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST - Add car with image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { make, model, price } = req.body;
    const imagePath = req.file ? `uploads/${req.file.filename}` : null;

    const newCar = new Car({ make, model, price, image: imagePath });
    await newCar.save();

    res.status(201).json(newCar);
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: "Failed to upload car" });
  }
});

export default router;
