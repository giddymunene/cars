import React, { useState, useEffect } from "react";
import axios from "axios";
import ImageUploader from "../Components/ImageUploader"; // ✅ Import your uploader
import "./ManageCars.css";

const ManageCars = () => {
  const [cars, setCars] = useState([]);

  // Fetch cars from backend
  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cars");
      setCars(res.data);
    } catch (err) {
      console.error("❌ Error fetching cars:", err);
    }
  };

  // Delete car
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await axios.delete(`http://localhost:5000/api/cars/${id}`);
        setCars((prev) => prev.filter((car) => car._id !== id));
      } catch (err) {
        console.error("❌ Error deleting car:", err);
      }
    }
  };

  return (
    <div className="manage-cars-container">
      <h2 className="title">🚗 Manage Cars</h2>

      {/* ✅ Upload Section */}
      <ImageUploader onCarAdded={fetchCars} />

      {/* ✅ Cars List */}
      <h3 className="subtitle">Available Cars</h3>
      <table className="cars-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Price (KES)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              
              <td>{car.model}</td>
              <td>{car.price}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(car._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCars;
