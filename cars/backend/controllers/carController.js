import Car from "../models/Car.js";

export const getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

export const addCar = async (req, res) => {
  const { name, location, price, currency } = req.body;
  try {
    const car = await Car.create({ name, location, price, currency });
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
