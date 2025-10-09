import express from "express";
import multer from "multer";
import Car from "../models/Car.js";

const router = express.Router();

// Multer config - store files in 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// POST: Add new car
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { car, model, price } = req.body;
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const newCar = new Car({ car, model, price, imageUrl });
    await newCar.save();

    res.status(201).json({ message: "Car added successfully!", car: newCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add car" });
  }
});


// GET: All cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

// routes/cars.js
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
