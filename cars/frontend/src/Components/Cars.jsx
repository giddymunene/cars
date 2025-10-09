import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cars.css";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.error("Error fetching cars:", err));
  }, []);

  return (
    <div className="cars-container">
      <h2 className="cars-title">Available Cars</h2>

      {cars.length === 0 ? (
        <p className="no-cars">No cars available.</p>
      ) : (
        <div className="cars-grid">
          {cars.map((car) => (
            <div key={car._id} className="car-card">
              <img src={car.imageUrl} alt={car.make} className="car-image" />
              <div className="car-details">
                <h3>{car.make}</h3>
                <p className="car-model">{car.model}</p>
                <p className="car-price">KES {car.price} / day</p>
                <div className="car-buttons">
                  <button
                    className="btn book-btn"
                    onClick={() => navigate("/booking", { state: { car } })}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;
